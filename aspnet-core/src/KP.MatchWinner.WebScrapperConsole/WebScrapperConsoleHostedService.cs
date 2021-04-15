using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Kp.MatchWinner.MatchAdmin;
using Microsoft.Extensions.Hosting;
using Volo.Abp;
using Volo.Abp.ObjectMapping;

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
            //await ScrapOldTournament();
            await ScrapRunningTournament();
            //await UploadFixture();
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _application.Shutdown();
            return Task.CompletedTask;
        }

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
                    Console.WriteLine($"Fetched schedules {schedules.Count}");
                    Console.WriteLine("**************************************************************");
                    Console.WriteLine();

                    await GetScoreCard(schedules, isLastTournament && isLastSeason);
                    Console.WriteLine("**************************************************************");
                    Console.WriteLine($"Fetched score card for matches {schedules.Count}");
                    Console.WriteLine("**************************************************************");
                    Console.WriteLine();
                    season.IsAvailable = true;
                    await _tournamentService.UpdateAsync(tournament.Id, tournament);
                }
            }
        }

        private async Task GetScoreCard(List<TournamentMatchDto> tournamentMatches, bool isLastTournament)
        {
            for (int i = 0; i < tournamentMatches.Count; i++)
            {
                bool isLastMatch = i == tournamentMatches.Count - 1;

                if (!string.IsNullOrEmpty(tournamentMatches[i].ScoreCardUrl) && (tournamentMatches[i].Winner == null ||(tournamentMatches[i].Winner != null && tournamentMatches[i].Winner != "Match yet to begin" && !tournamentMatches[i].Winner.Contains("abandoned", StringComparison.InvariantCultureIgnoreCase) && !tournamentMatches[i].Winner.Contains("No result", StringComparison.InvariantCultureIgnoreCase))))
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

        private async Task UploadFixture()
        {
            Guid id = new Guid(Convert.FromBase64String("qu6lQ1b3A5l90zn7YVHEhg=="));
            var tournament = await _tournamentService.GetAsync(id);

            string text = System.IO.File.ReadAllText(@"C:\Users\kunal\Downloads\ipl-2021-events.ics");
            var calendar = Ical.Net.Calendar.Load(text);
            //List<TournamentMatchDto> matches = new List<TournamentMatchDto>();
            foreach (var evnt in calendar.Events)
            {
                var match = new TournamentMatchDto();
                var teams = evnt.Summary.Split(" v ");
                match.HomeTeam = teams[0][(teams[0].IndexOf("Match ") + "Match ".Length)..];
                match.VisitorTeam = teams[1];
                match.ScoreCardUrl = evnt.Description[(evnt.Description.IndexOf(": ") + 2)..];
                match.Venue = evnt.Location;
                match.PlayedDate = evnt.DtStart.Date;
                match.Season = "2021";
                match.TournamentId = tournament.Id;
                await _tournamentMatchService.CreateAsync(match);
                //matches.Add(match);
            }
            Console.WriteLine("Fixture uploaded successfully.");
        }

        private async Task ScrapRunningTournament() {
            var matches = _tournamentMatchService.GetDailyMatchForScrap();
            await GetScoreCard(matches, true);
        }
    }
}
