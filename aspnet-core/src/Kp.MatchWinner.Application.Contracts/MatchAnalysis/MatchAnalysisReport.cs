using Kp.MatchWinner.MatchAdmin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kp.MatchWinner.MatchAnalysis
{
    public class MatchAnalysisReport
    {
        public List<TournamentMatchDto> MatchByTeam { get; set; }
        public List<TournamentMatchDto> MatchAgainstTeam { get; set; }
        public List<TournamentMatchDto> MatchBetweenTeam { get; set; }
        public List<TournamentMatchDto> MatchAtVenue { get; set; }
    }
}
