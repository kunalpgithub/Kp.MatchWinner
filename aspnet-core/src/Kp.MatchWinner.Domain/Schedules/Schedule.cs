using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace Kp.MatchWinner.Schedules
{
    public class Schedule: AuditedAggregateRoot<Guid>
    {
        public string HomeTeam { get; set; }
        public string VisitorTeam { get; set; }
        public string Location { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
