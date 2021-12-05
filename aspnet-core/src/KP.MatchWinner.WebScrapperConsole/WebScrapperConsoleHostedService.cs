using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AngleSharp.Io;
using Kp.MatchWinner.MatchAdmin;
using Microsoft.Extensions.Hosting;
using Volo.Abp;
using Volo.Abp.ObjectMapping;
using static IdentityModel.OidcConstants;
using static Volo.Abp.Identity.IdentityPermissions;

namespace KP.MatchWinner.WebScrapperConsole
{
    public class WebScrapperConsoleHostedService : IHostedService
    {
        private readonly IAbpApplicationWithExternalServiceProvider _application;
        private readonly IServiceProvider _serviceProvider;
        private readonly ITournamentService _tournamentService;
        private readonly ITournamentMatchService _tournamentMatchService;
        private readonly WebScrapperService _webScrapperService;
        //private readonly IObjectMapper _objectMapper;


        public WebScrapperConsoleHostedService(
            IAbpApplicationWithExternalServiceProvider application,
            IServiceProvider serviceProvider,
            WebScrapperService webScrapperService
            , ITournamentService tournamentService
            , ITournamentMatchService tournamentMatchService

            //,IObjectMapper objectMapper
            )
        {
            _application = application;
            _serviceProvider = serviceProvider;
            _webScrapperService = webScrapperService;
            _tournamentService = tournamentService;
            _tournamentMatchService = tournamentMatchService;
            //_objectMapper = objectMapper;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            _application.Initialize(_serviceProvider);
            await ScrapOldTournament();
            //await ScrapRunningTournament();

            //await UploadFixture("Big Bash League", "2021/22", @"C:\Users\kunal\Downloads\big-bash-league-2021-22-events.ics");
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _application.Shutdown();
            return Task.CompletedTask;
        }
        /// <summary>
        /// This method scrap data for completed tournament. Provided  tournament & season are added in DB as not available.
        /// </summary>
        /// <returns></returns>
        private async Task ScrapOldTournament()
        {
            //Get tournaments which are not scraped.
            var tournamentList = _tournamentService.GetTournamnetByAvailability
(false);
            for (int j = 0; j < tournamentList.Count; j++)
            {
                bool isLastTournament = j == tournamentList.Count - 1;
                var tournament = tournamentList[j];

                for (int s = 0; s < tournament.Seasons.Count(); s++)
                {
                    var season = tournament.Seasons.ElementAt(s);
                    bool isLastSeason = s == tournament.Seasons.Count() - 1;
                    Console.WriteLine("==============================================================");
                    Console.WriteLine($"Fetching {tournament.TournamentName} - Season {season.Season}");
                    Console.WriteLine("==============================================================");
                    Console.WriteLine();

                    var schedules = _webScrapperService.BrowseSchedule(tournament, season.Season, true);
                    Console.WriteLine("**************************************************************");
                    Console.WriteLine($"Fetched schedules {  schedules?.Count}");
                    Console.WriteLine("**************************************************************");
                    Console.WriteLine();

                    await GetScoreCard(schedules, isLastTournament && isLastSeason);
                    Console.WriteLine("**************************************************************");
                    Console.WriteLine($"Fetched score card for matches {schedules?.Count}");
                    Console.WriteLine("**************************************************************");
                    Console.WriteLine();
                    season.IsAvailable = true;
                    await _tournamentService.UpdateAsync(tournament.Id, tournament);
                }
            }
        }

        /// <summary>
        /// Fetch score card for tournament match. If its fails to fetch scorecard it will mark match hasScorecard false. Which can be scrapped seperately by Url.
        /// </summary>
        /// <param name="tournamentMatches"></param>
        /// <param name="isLastTournament"></param>
        /// <returns></returns>
        private async Task GetScoreCard(List<TournamentMatchDto> tournamentMatches, bool isLastTournament)
        {
            for (int i = 0; i < tournamentMatches.Count; i++)
            {
                bool isLastMatch = i == tournamentMatches.Count - 1;

                if (!string.IsNullOrEmpty(tournamentMatches[i].ScoreCardUrl) && (tournamentMatches[i].Winner == null || (tournamentMatches[i].Winner != null && tournamentMatches[i].Winner != "Match yet to begin" && !tournamentMatches[i].Winner.Contains("abandoned", StringComparison.InvariantCultureIgnoreCase) && !tournamentMatches[i].Winner.Contains("No result", StringComparison.InvariantCultureIgnoreCase))))
                {
                    tournamentMatches[i].HasBallByBall = false;
                    tournamentMatches[i].HasScoreCard = true;
                    await _webScrapperService.BrowseScore(tournamentMatches[i], !(isLastTournament && isLastMatch));
                }
                else
                {
                    tournamentMatches[i].HasBallByBall = false;
                    tournamentMatches[i].HasScoreCard = false;
                }
                if (tournamentMatches[i].Id == Guid.Empty)
                {
                    await _tournamentMatchService.CreateAsync(tournamentMatches[i]);
                }
                else
                {
                    await _tournamentMatchService.UpdateAsync(tournamentMatches[i].Id, tournamentMatches[i]);
                }
                Console.WriteLine($" {tournamentMatches[i].Season } Score card for {tournamentMatches[i].HomeTeam} vs {tournamentMatches[i].VisitorTeam}");
            }
        }

        /// <summary>
        /// Dowloand  tournament calender,and place it on mentioned locaiton to upload.
        /// </summary>
        /// <returns></returns>
        private async Task UploadFixture(string tournamentName, string season, string filepath)
        {
            //Guid id = new Guid(Convert.FromBase64String("qu6lQ1b3A5l90zn7YVHEhg=="));
            //var tournament = await _tournamentService.GetAsync(id);

            //Get tournament.
            var tournament = _tournamentService.GetTournamentByName(tournamentName);

            //Create tournament if does not exist.
            if (tournament == null)
            {
                //Create tournament with season
                List<TournamentSeasonDto> seasons = new List<TournamentSeasonDto>() { new TournamentSeasonDto { IsAvailable = false, Season = season } };
                tournament = await _tournamentService.CreateAsync(new TournamentDto
                {
                    TournamentName = tournamentName,
                    Seasons = seasons
                });
            }// Update tournament is season doesn't exist.
            else if(!tournament.Seasons.Any(x => x.Season == season))
            {

                tournament.Seasons.Append(new TournamentSeasonDto { IsAvailable = false, Season = season });
                tournament = await _tournamentService.UpdateAsync(tournament.Id,tournament);
            }

            //Insert schedule for calendar file.
            //@"C:\Users\kunal\Downloads\caribbean-premier-league-2021-events.ics"
            string text = System.IO.File.ReadAllText(filepath);
            var calendar = Ical.Net.Calendar.Load(text);
            foreach (var evnt in calendar.Events)
            {
                var match = new TournamentMatchDto();
                var teams = evnt.Summary.Split(" v ");
                match.HomeTeam = teams[0][(teams[0].IndexOf("Match ") + "Match ".Length)..];
                match.VisitorTeam = teams[1];
                match.ScoreCardUrl = evnt.Description[(evnt.Description.IndexOf(": ") + 2)..];
                match.Venue = evnt.Location;
                match.PlayedDate = evnt.DtStart.Date;
                match.Season = season;
                match.TournamentId = tournament.Id;
                await _tournamentMatchService.CreateAsync(match);
                //matches.Add(match);
            }
            Console.WriteLine("Fixture uploaded successfully.");
        }

        /// <summary>
        /// Scrap individual matches played in running tournament.
        /// </summary>
        /// <returns></returns>
        private async Task ScrapRunningTournament()
        {
            var matches = _tournamentMatchService.GetDailyMatchForScrap();
            await GetScoreCard(matches, true);
        }
    }
}
