using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kp.MatchWinner.Matches
{
    public class MatchAnalysisDto
    {
        public List<MatchScoreDto> MatchScores { get; set; }
        public List<MatchScoreDto> HomeTeamVenueMatchScores { get; set; }
        public List<MatchScoreDto> VisitorTeamVenueMatchScores { get; set; }
        public List<PlayerBattleDto> PlayerBattles { get; set; }
    }
}
