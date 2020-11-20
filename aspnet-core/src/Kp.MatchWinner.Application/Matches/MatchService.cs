using Kp.MatchWinner.Matches;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Kp.MatchWinner
{
    public class MatchService : CrudAppService<Match, MatchDto, Guid, PagedAndSortedResultRequestDto, MatchDto>, IMatchService
    {
        readonly IRepository<Match, Guid> _repository;
        readonly MatchManager _matchManager;
        public MatchService(IRepository<Match, Guid> repository,MatchManager matchManager):base(repository)
        {
            _repository = repository;
            _matchManager = matchManager;
        }
        public string[] GetAllTeams()
        {
            return _repository.SelectMany(m => m.Info.Teams).Distinct().ToArray();
        }

        public async Task< MatchScoreDto> GetMatchScore(string TeamName)
        {
             return ObjectMapper.Map<MatchScore,MatchScoreDto>(await _matchManager.FindMatchScore(TeamName));
        }
    }
}
