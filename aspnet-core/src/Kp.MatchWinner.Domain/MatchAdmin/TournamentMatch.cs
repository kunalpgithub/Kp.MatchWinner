using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace Kp.MatchWinner.MatchAdmin
{
    public class TournamentMatch : FullAuditedEntity<Guid>
    {
        public string HomeTeam { get; set; }
        public string HomeTeamScore { get; set; }
        public string VisitorTeam { get; set; }
        public string VisitorTeamScore { get; set; }
        public string PlayedOn { get; set; }
        public string Venue { get; set; }
        public string ScoreCardUrl { get; set; }
        public string Winner { get; set; }
        public DateTime PlayedDate { get; set; }
        public bool HasScore { get; set; }
        public bool HasBallByBall { get; set; }
        public Guid TournamentId { get; set; }
        public string Season { get; set; }
        public TeamScore HomeTeamScoreCard { get; set; }
        public TeamScore VisitorTeamScoreCard { get; set; }
    }
}
