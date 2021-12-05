using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Kp.MatchWinner.MatchAdmin
{
    
    public class TournamentMatchService : CrudAppService<TournamentMatch, TournamentMatchDto, Guid, PagedAndSortedResultRequestDto, TournamentMatchDto, TournamentMatchDto>,ITournamentMatchService
    {
        private readonly IRepository<TournamentMatch, Guid> _tournamentMatchRepo;
        private readonly IRepository<Tournament, Guid> _tournamentRepo;
        public TournamentMatchService(IRepository<TournamentMatch,Guid> tournamentMatchRepo, IRepository<Tournament, Guid> tournamentRepo) :base(tournamentMatchRepo)
        {
            _tournamentMatchRepo = tournamentMatchRepo;
            _tournamentRepo = tournamentRepo;
        }

        public List<TournamentMatchDto> GetMatches(Guid tournamentId,string season)
        {
            var matches = _tournamentMatchRepo.Where(x => x.TournamentId == tournamentId && x.Season == season ).OrderBy(x=>x.PlayedDate).ToList();
            return ObjectMapper.Map<List<TournamentMatch>, List<TournamentMatchDto>>(matches);
        }

        public List<CurrentTournamentDto> GetRunningTournament() {

            //var tms = (from tm in _tournamentMatchRepo.AsQueryable()
            //           where tm.PlayedDate != null && tm.PlayedDate >= DateTime.Now.AddDays(-7) && tm.HomeTeamScoreCard == null && tm.VisitorTeamScoreCard == null
            //           group tm by new { tm.TournamentId, tm.Season } into tmGroup
            //           join t in _tournamentRepo.AsQueryable() on tmGroup.Key.TournamentId equals t.Id
            //           select t).ToList();

            var tmGroup = (from tm in _tournamentMatchRepo.AsQueryable()
                           where
                           /*tm.PlayedDate != null && tm.PlayedDate >= DateTime.Now.AddDays(-30) &&*/ tm.HomeTeamScoreCard == null && tm.VisitorTeamScoreCard == null
                           group tm by new { tm.TournamentId, tm.Season }).ToList();

            var currentTournaments = from tmg in tmGroup
                        join t in _tournamentRepo.AsQueryable().ToList() on tmg.Key.TournamentId equals t.Id
                        orderby tmg.Key.Season descending
                        select new CurrentTournamentDto {
                            TournamentId =tmg.Key.TournamentId,
                            TournamentName = t.TournamentName,
                            Season = tmg.Key.Season
                        };
            return currentTournaments.ToList();
        }

        public List<TournamentMatchDto> GetDailyMatchForScrap() {

            var matches = _tournamentMatchRepo.Where(x => x.HomeTeamScoreCard == null && x.VisitorTeamScoreCard == null && x.PlayedDate <= DateTime.Now.AddDays(-1));
            return ObjectMapper.Map<List<TournamentMatch>, List<TournamentMatchDto>>(matches.ToList());
        }

        //public bool uploadTournament() { 

        //}
    }
}
