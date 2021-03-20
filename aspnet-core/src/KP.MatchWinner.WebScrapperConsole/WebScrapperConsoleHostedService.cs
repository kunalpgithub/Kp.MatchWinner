using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Kp.MatchWinner.MatchAdmin;
using Microsoft.Extensions.Hosting;
using Volo.Abp;

namespace KP.MatchWinner.WebScrapperConsole
{
    public class WebScrapperConsoleHostedService : IHostedService
    {
        private readonly IAbpApplicationWithExternalServiceProvider _application;
        private readonly IServiceProvider _serviceProvider;
        private readonly ITournamentService _tournamentService;
        private readonly ITournamentMatchService _tournamentMatchService;
        private readonly WebScrapperService _webScrapperService;


        public WebScrapperConsoleHostedService(
            IAbpApplicationWithExternalServiceProvider application,
            IServiceProvider serviceProvider,
            WebScrapperService webScrapperService
            , ITournamentService tournamentService
            , ITournamentMatchService tournamentMatchService
            )
        {
            _application = application;
            _serviceProvider = serviceProvider;
            _webScrapperService = webScrapperService;
            _tournamentService = tournamentService;
            _tournamentMatchService = tournamentMatchService;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            _application.Initialize(_serviceProvider);
            await ScrapOldTournament();
            //await ScrapCurrentTournament();
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
                Console.WriteLine($"Fetching {tournament.TournamentName} - Season {tournament.Season}");
                var schedules = _webScrapperService.BrowseSchedule(tournament, true);
                Console.WriteLine($"Fetched schedules {schedules.Count}");
                await GetScoreCard(schedules, isLastTournament);
                tournament.IsAvailable = true;
                await _tournamentService.UpdateAsync(tournament.Id, tournament);
            }
        }

        private async Task ScrapCurrentTournament()
        {
            var tournament = await _tournamentService.CreateAsync(new TournamentDto { TournamentName = "Pakistan Super League", Season = "2021" });
            var schedules = _webScrapperService.BrowseSchedule(tournament, true,"https://www.espncricinfo.com/ci/engine/series/index.html?view=month");
            await GetScoreCard(schedules, true);
        }

        private async Task GetScoreCard(List<TournamentMatchDto> tournamentMatches, bool isLastTournament)
        {
            for (int i = 0; i < tournamentMatches.Count; i++)
            {
                bool isLastMatch = i == tournamentMatches.Count - 1;

                if (!string.IsNullOrEmpty(tournamentMatches[i].ScoreCardUrl) && tournamentMatches[i].Winner != "Match yet to begin" && !tournamentMatches[i].Winner.Contains("abandoned", StringComparison.InvariantCultureIgnoreCase) && !tournamentMatches[i].Winner.Contains("No result", StringComparison.InvariantCultureIgnoreCase))

                {
                    tournamentMatches[i].HasBallByBall = false;
                    tournamentMatches[i].HasScoreCard = true;
                    await _webScrapperService.BrowseScore(tournamentMatches[i], !(isLastTournament && isLastMatch));
                }
                else {
                    tournamentMatches[i].HasBallByBall = false;
                    tournamentMatches[i].HasScoreCard = false;
                }
                await _tournamentMatchService.CreateAsync(tournamentMatches[i]);
            }
        }
    }
}
