using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace Kp.MatchWinner.Matches
{
    public class Match: AuditedAggregateRoot<Guid>
    {
        public Meta Meta { get; set; }
        public Info Info { get; set; }
        public Dictionary<string, Inning>[] Innings { get; set; }

        public object GetHostTeam()
        {
            throw new NotImplementedException();
        }

        public object GetOnDate()
        {
            throw new NotImplementedException();
        }

        public object GetVisitingTeam()
        {
            throw new NotImplementedException();
        }
    }
}
