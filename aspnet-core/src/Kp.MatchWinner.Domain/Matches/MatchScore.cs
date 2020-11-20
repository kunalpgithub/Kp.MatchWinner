using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kp.MatchWinner.Matches
{
    public class MatchScore
    {
        public TeamScore HostTeam { get; set; }
        public TeamScore VisitorTeam { get; set; }
        public string Venue { get; set; }
        public string City { get; set; }
        public DateTime MatchDate { get; set; }
    }

    public class TeamScore { 
        public string Team { get; set; }
        public List< PlayerScore> Players { get; set; }
        public int Extra { get; set; }
    }

    public class PlayerScore { 
        public string PlayerName { get; set; }
        public Score Batting { get; set; }
        public Score Bowling { get; set; }
    }

    public class Score {
        public int Runs { get; set; }
        public int Balls { get; set; }
        public int Fours { get; set; }
        public int Sixes { get; set; }
        public int Wickets { get; set; }

    }
}
