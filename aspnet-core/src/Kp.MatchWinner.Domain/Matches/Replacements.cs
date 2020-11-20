using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kp.MatchWinner.Matches
{
    public class Replacements
    {
        public ReplacementRole[] Role { get; set; }
    }
    public class ReplacementRole
    {
        public string In { get;set; }
        public string Out { get; set; }            
        public string Reason { get; set; }
        public string Role { get; set; }
    }

    public class InType { 
        public string In { get; set; }
    }
}
