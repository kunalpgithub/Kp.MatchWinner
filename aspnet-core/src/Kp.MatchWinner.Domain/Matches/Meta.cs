using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kp.MatchWinner.Matches
{
    public class Meta
    {
        public string DataVersion { get; set; }
        public DateTime Created { get; set; }
        public int Revision { get; set; }

        internal void Sanitize()
        {
            throw new NotImplementedException();
        }
    }
}
