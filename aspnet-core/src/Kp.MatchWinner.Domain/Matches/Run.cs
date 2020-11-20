using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kp.MatchWinner.Matches
{
    public class Run
    {
        //todo: convert this to integer.
        public string Batsman { get; set; }
        public int Extras { get; set; }
        public int Total { get; set; }
        public int NonBoundary { get; set; }
    }
}
