using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kp.MatchWinner.Matches
{
    public class Info
    {
        public string City { get; set; }
        public string Competition { get; set; }
        public DateTime[] Dates { get; set; }
        public string Gender { get; set; }
        public string MatchType { get; set; }
        public Outcome Outcome { get; set; }
        public Decimal Overs { get; set; }

        internal void Sanitize()
        {
            throw new NotImplementedException();
        }

        public string[] PlayerOfMatch { get; set; }
        public string[] Teams { get; set; }
        public Toss Toss { get; set; }
        public string[] Umpires { get; set; }
        public string Venue { get; set; }

        public int NeutralVenue { get; set; }

    }
}
