using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;

namespace Kp.MatchWinner.Matches
{
    public class MatchManager : DomainService
    {
        readonly IRepository<Match, Guid> _matchRepository;
        public MatchManager(IRepository<Match, Guid> matchRepository)
        {
            _matchRepository = matchRepository;
        }

        public async Task<MatchScore> FindMatchScore(string TeamName)
        {
            var match = await _matchRepository.FirstOrDefaultAsync(x => x.Info.Teams.Any(t => t == TeamName));
            return GetMatchScore(match);
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
                    Players = new List<PlayerScore>()

                };
                matchScore.VisitorTeam = new TeamScore()
                {
                    Team = match.Info.Teams[1],
                    Players = new List<PlayerScore>()
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
                            Batting = new Score
                            {
                                Runs = d.Sum(x => Convert.ToInt32(x.Runs.Batsman)),
                                Balls = d.Count(),
                            }
                        }).ToList();

                        var bowlerList = inning.Deliveries.Select(x => x.Values.First()).GroupBy(x => x.Bowler).Select(d => new PlayerScore
                        {
                            PlayerName = d.Key,
                            Bowling = new Score
                            {
                                Runs = d.Sum(x => Convert.ToInt32(x.Runs.Batsman)),
                                Balls = d.Count(),
                                Wickets = d.Sum(x => Convert.ToInt32(x.Wicket == null ? 0 : 1))
                            }
                        }).ToList();

                        if (inning.Team == matchScore.HostTeam.Team)
                        {
                            matchScore.HostTeam.Players.AddRange(batsmanList);
                            matchScore.VisitorTeam.Players.AddRange(bowlerList);
                        }
                        else
                        {
                            matchScore.HostTeam.Players.AddRange(bowlerList);
                            matchScore.VisitorTeam.Players.AddRange(batsmanList);
                        }
                    }
                }
            }
            return matchScore;
        }
    }
}
