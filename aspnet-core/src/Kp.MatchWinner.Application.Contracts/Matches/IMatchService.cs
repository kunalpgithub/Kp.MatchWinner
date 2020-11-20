using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Kp.MatchWinner.Matches
{
    public interface IMatchService: ICrudAppService<MatchDto,Guid, PagedAndSortedResultRequestDto, MatchDto>
    {
        string[] GetAllTeams();

        Task<MatchScoreDto> GetMatchScore(string TeamName);
    }
}
