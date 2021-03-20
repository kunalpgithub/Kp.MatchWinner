using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace Kp.MatchWinner.MatchAdmin
{
    public class TeamScore
    {
        public TeamScore()
        {
            Batsmen = new List<BatsMan>();
            Bowlers = new List<Bowler>();
        }
        public string Name { get; set; }
        public string Score { get; set; }
        public List<BatsMan> Batsmen { get; set; }
        public List<Bowler> Bowlers { get; set; }

    }
    public class BatsMan
    {
        public string Name { get; set; }
        public string WicketBy { get; set; }
        public int Run { get; set; }
        public int Balls { get; set; }
        public int Four { get; set; }
        public int Six { get; set; }
    }
    public class Bowler
    {
        public string Name { get; set; }
        public double Over { get; set; }
        public int Run { get; set; }
        public int Wicket { get; set; }
    }
}
