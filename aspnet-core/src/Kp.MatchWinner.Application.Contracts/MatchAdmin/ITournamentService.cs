using Kp.MatchWinner.MatchAdmin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Kp.MatchWinner.MatchAdmin
{
    public interface ITournamentService : ICrudAppService<TournamentDto,Guid, PagedAndSortedResultRequestDto,TournamentDto,TournamentDto>
    {
        public List<TournamentDto> GetTournamnetByAvailability(bool isAvailable);
        TournamentDto GetTournamentByName(string tournamentName);
    }
}
