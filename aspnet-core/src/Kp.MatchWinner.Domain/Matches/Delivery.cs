using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kp.MatchWinner.Matches
{
    public class Delivery
    {
        public string Batsman { get; set; }
        public string Bowler { get; set; }
        public Extra Extras { get; set; }
        public string NonStriker { get; set; }
        public Run Runs { get; set; }
        public Wicket Wicket { get; set; }

        public Replacements Replacements { get; set; }
        
        

    }
}
