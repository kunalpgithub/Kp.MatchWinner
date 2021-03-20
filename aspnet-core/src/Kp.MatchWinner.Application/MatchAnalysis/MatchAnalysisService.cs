using Kp.MatchWinner.MatchAdmin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.ObjectMapping;

namespace Kp.MatchWinner.MatchAnalysis
{
    public class MatchAnalysisService : ApplicationService
    {
        private readonly IRepository<TournamentMatch, Guid> _tournamentMatchRepo;
        public MatchAnalysisService(IRepository<TournamentMatch, Guid> tournamentMatchRepo)
        {
            _tournamentMatchRepo = tournamentMatchRepo;
        }
        public MatchAnalysisReport GetMatchAnalysis(string homeTeam, string visitorTeam, string venue)
        {

            //Get last 5 matches played by team.
            var allMatchesByTeam = _tournamentMatchRepo.Where(x => x.HomeTeam == homeTeam || x.HomeTeam == visitorTeam).OrderBy(x=>x.PlayedDate).AsQueryable();

            var matchesAgainstTeam = allMatchesByTeam.Where(x => x.VisitorTeam == visitorTeam || x.HomeTeam == visitorTeam).Take(5);
            var matchesByTeam = allMatchesByTeam.Where(x => x.VisitorTeam == homeTeam || x.HomeTeam == homeTeam).Take(5);
            var matchesBetweenTeam = allMatchesByTeam.Where(x => (x.HomeTeam == homeTeam || x.VisitorTeam == homeTeam) && (x.HomeTeam == visitorTeam || x.VisitorTeam == visitorTeam)).Take(5);
            var allMatchesAtVenue = allMatchesByTeam.Where(x => x.Venue == venue).Take(5);

            return new MatchAnalysisReport
            {
                MatchByTeam = ObjectMapper.Map<List<TournamentMatch>, List<TournamentMatchDto>>(matchesByTeam.ToList()),
                MatchAgainstTeam = ObjectMapper.Map<List<TournamentMatch>, List<TournamentMatchDto>>(matchesAgainstTeam.ToList()),
                MatchBetweenTeam = ObjectMapper.Map<List<TournamentMatch>, List<TournamentMatchDto>>(matchesBetweenTeam.ToList()),
                MatchAtVenue = ObjectMapper.Map<List<TournamentMatch>, List<TournamentMatchDto>>(allMatchesAtVenue.ToList()),
            };
        }
    }
}
