using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kp.MatchWinner.Matches
{
    public class Outcome
    {
        public Dictionary<string, string> By { get; set; }
        public string Winner { get; set; }
        public string Eliminator { get; set; }
        public string Result { get; set; }
        public string Method {get;set;}
    }
}
