using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Kp.MatchWinner.MatchAdmin
{
    public interface ITournamentMatchService : ICrudAppService<TournamentMatchDto, Guid, PagedAndSortedResultRequestDto, TournamentMatchDto, TournamentMatchDto>
    {
        public List<TournamentMatchDto> GetMatches(Guid TournamentId,string Season);
        public List<CurrentTournamentDto> GetRunningTournament();
    }
}
