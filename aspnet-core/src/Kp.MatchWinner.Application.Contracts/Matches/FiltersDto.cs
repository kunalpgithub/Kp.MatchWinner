using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kp.MatchWinner.Matches
{
    public class MatchFiltersDto
    {
        public string[] Teams { get; set; }
        public string[] Venues { get; set; }
        public string[] BatsMen { get; set; }
        public string[] Bowlers { get; set; }
    }
}
