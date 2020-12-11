using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kp.MatchWinner.Matches
{
    public class MatchAnalysis
    {
        public List<MatchScore> MatchScores { get; set; }
        public List<PlayerBattle> PlayerBattles { get; set; }

        public List<MatchScore> HomeTeamVenueMatchScores { get; set; }
        public List<MatchScore> VisitorTeamVenueMatchScores { get; set; }

    }
}
