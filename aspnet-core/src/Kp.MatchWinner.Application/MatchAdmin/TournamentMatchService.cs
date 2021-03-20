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
        public TournamentMatchService(IRepository<TournamentMatch,Guid> tournamentMatchRepo):base(tournamentMatchRepo)
        {
            _tournamentMatchRepo = tournamentMatchRepo;
        }

        public List<TournamentMatchDto> GetMatchesByTournament(Guid tournamentId)
        {
            var matches = _tournamentMatchRepo.Where(x => x.TournamentId == tournamentId).ToList();
            return ObjectMapper.Map<List<TournamentMatch>, List<TournamentMatchDto>>(matches);
        }
    }
}
