using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace Kp.MatchWinner.Schedules
{
    public class ScheduleDto : AuditedEntityDto<Guid>
    {
        public string HomeTeam { get; set; }
        public string VisitorTeam { get; set; }
        public string Location { get; set; }
        public bool ShowAnalysis { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
