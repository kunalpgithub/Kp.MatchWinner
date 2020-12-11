using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

namespace Kp.MatchWinner.Matches
{
    //    Last 5 matches played by team
    //Last 5 matches played by team at this ground
    //Last 5 matches played by team against this team.

    public class MatchManager : DomainService
    {
        readonly IRepository<Match, Guid> _matchRepository;
        public MatchManager(IRepository<Match, Guid> matchRepository)
        {
            _matchRepository = matchRepository;
        }

        public MatchAnalysis GetMatchAnalysis(string TeamName, string OpponentTeam, string Venue)
        {
            var matches = FindMatchesByTeams(TeamName, OpponentTeam);
            var HomeTeamAtVenue = FindMatchesByVenue(TeamName,  Venue);
            var VisitorTeamAtVenue = FindMatchesByVenue(OpponentTeam, Venue);
            var analysis = new MatchAnalysis
            {
                MatchScores = FindMatchScore(matches),
                PlayerBattles = GetPlayerBattle(matches),
                HomeTeamVenueMatchScores = FindMatchScore(HomeTeamAtVenue),
                VisitorTeamVenueMatchScores =FindMatchScore(VisitorTeamAtVenue)
            };
            return analysis;
        }

        public List<MatchScore> FindMatchScore(IQueryable<Match> Matches)
        {
            var matches = Matches.ToList();
            List<MatchScore> matchScores = new List<MatchScore>();
            foreach (var match in matches)
            {
                matchScores.Add(GetMatchScore(match));
            }
            return matchScores;
        }

        private MatchScore GetMatchScore(Match match)
        {
            MatchScore matchScore = new MatchScore();
            if (match != null && match.Info != null)
            {
                matchScore.City = match.Info.City;
                matchScore.HostTeam = new TeamScore
                {
                    Team = match.Info.Teams[0],
                    Batsmen = new List<PlayerScore>(),
                    Bowlers = new List<PlayerScore>()

                };
                matchScore.VisitorTeam = new TeamScore()
                {
                    Team = match.Info.Teams[1],
                    Batsmen = new List<PlayerScore>(),
                    Bowlers = new List<PlayerScore>()
                };
                matchScore.Venue = match.Info.Venue;
                matchScore.MatchDate = match.Info.Dates[0];

                foreach (var inningItem in match.Innings)
                {
                    foreach (var inning in inningItem.Values)
                    {
                        var batsmanList = inning.Deliveries.Select(x => x.Values.First()).GroupBy(x => x.Batsman).Select(d => new PlayerScore
                        {
                            PlayerName = d.Key,
                            Runs = d.Sum(x => Convert.ToInt32(x.Runs.Batsman)),
                            Balls = d.Count(),
                        }).Where(x => x.Runs >= 20).OrderByDescending(x => x.Runs).ToList();

                        var bowlerList = inning.Deliveries.Select(x => x.Values.First()).GroupBy(x => x.Bowler).Select(d => new PlayerScore
                        {
                            PlayerName = d.Key,
                            Runs = d.Sum(x => Convert.ToInt32(x.Runs.Batsman)),
                            Balls = d.Count(),
                            Wickets = d.Sum(x => Convert.ToInt32(x.Wicket == null ? 0 : 1))
                        }).Where(x => x.Wickets > 0).OrderByDescending(x => x.Wickets).ToList();

                        if (inning.Team == matchScore.HostTeam.Team)
                        {
                            matchScore.HostTeam.Batsmen.AddRange(batsmanList);
                            matchScore.VisitorTeam.Bowlers.AddRange(bowlerList);
                        }
                        else
                        {
                            matchScore.HostTeam.Bowlers.AddRange(bowlerList);
                            matchScore.VisitorTeam.Batsmen.AddRange(batsmanList);
                        }
                    }
                }
            }
            return matchScore;
        }

        private List<PlayerBattle> GetPlayerBattle(IQueryable<Match> Matches)
        {
            var playerBattle = Matches.ToList().SelectMany(x => x.Innings.SelectMany(x => x.Values).SelectMany(x => x.Deliveries.SelectMany(x => x.Values))).GroupBy(x => new { x.Batsman, x.Bowler }).Select(p => new PlayerBattle
            {
                Batsman = p.Key.Batsman,
                Bowler = p.Key.Bowler,
                Runs = p.Sum(x => x.Runs.Total),
                Balls = p.Count(),
                Wickets = p.Count(x => x.Wicket != null)
            }).Where(x => x.Balls > 15).OrderByDescending(x => x.Runs).ToList();

            return playerBattle;
        }

        private IQueryable<Match> FindMatchesByTeams(string TeamName, string OpponentTeam, bool IncludeAllMatch = false)
        {
            IQueryable<Match> matches = null;
            string[] TeamToCompare = new string[] { TeamName, OpponentTeam };
            List<MatchScore> matchScores = new List<MatchScore>();
            matches = _matchRepository
            .Where(x =>
            (x.Info.Teams == TeamToCompare || x.Info.Teams == TeamToCompare.Reverse()) &&
            x.Info.Dates.Any(x => x >= DateTime.Now.AddYears(-2)));

            if (IncludeAllMatch)
                return matches;
            else
                return matches.OrderByDescending(x => x.Info.Dates);
        }

        private IQueryable<Match> FindMatchesByVenue(string TeamName, string Venue, bool IncludeAllMatch = false)
        {
            IQueryable<Match> matches = null;
            List<MatchScore> matchScores = new List<MatchScore>();

            matches = _matchRepository
            .Where(x =>
            x.Info.Teams.Any(x => x == TeamName) && x.Info.Venue == Venue);
            //x.Info.Dates.Any(x => x >= DateTime.Now.AddYears(-2)));
            return matches.OrderByDescending(x => x.Info.Dates).Take(5);
        }

        public async Task<bool> UploadMatchFromYAML(string YamlInput)
        {
            try
            {
                INamingConvention underScoredNaming = new UnderscoredNamingConvention();
                var deserializer = new DeserializerBuilder()
                    .WithNamingConvention(underScoredNaming)
                    .Build();
                var item = deserializer.Deserialize<Match>(YamlInput);
                await _matchRepository.InsertAsync(item, autoSave: true);
            }
            catch (Exception ex)
            {

                System.Diagnostics.Debug.WriteLine(ex);
            }

            return true;
        }
    }
}