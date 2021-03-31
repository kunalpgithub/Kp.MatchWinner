using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Entities.Auditing;

namespace Kp.MatchWinner.MatchAdmin
{
    public class TournamentDto : FullAuditedEntityDto<Guid>
    {
        public string TournamentName { get; set; }
        public IEnumerable<TournamentSeasonDto> Seasons { get; set; }
    }

    public class TournamentSeasonDto
    {
        public string Season { get; set; }
        public bool IsAvailable { get; set; }

    }
}
