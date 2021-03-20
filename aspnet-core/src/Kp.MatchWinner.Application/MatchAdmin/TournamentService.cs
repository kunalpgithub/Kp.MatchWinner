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
    public class TournamentService: CrudAppService<Tournament, TournamentDto, Guid, PagedAndSortedResultRequestDto, TournamentDto,TournamentDto> ,ITournamentService
    {
        private readonly IRepository<Tournament, Guid> _tournamentRepo;
        public TournamentService(IRepository<Tournament,Guid> tournamentRepo) :base(tournamentRepo)
        {
            _tournamentRepo = tournamentRepo;
        }

        public List<TournamentDto> GetTournamnetByAvailability(bool isAvailable)
        {
             var tournaments = _tournamentRepo.Where(x => x.IsAvailable == isAvailable).ToList();
            return ObjectMapper.Map<List<Tournament>, List<TournamentDto>>(tournaments);
        }
    }
}
