using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Entities.Auditing;

namespace Kp.MatchWinner.MatchAdmin
{
    public class TournamentMatchDto : FullAuditedEntityDto<Guid>
    {
        public string HomeTeam { get; set; }
        public string HomeTeamScore { get; set; }
        public string VisitorTeam { get; set; }
        public string VisitorTeamScore { get; set; }
        public string PlayedOn { get; set; }
        public DateTime PlayedDate { get; set; }
        public string Venue { get; set; }
        public string ScoreCardUrl { get; set; }
        public string Winner { get; set; }
        public Guid TournamentId { get; set; }
        public TeamScoreDto HomeTeamScoreCard { get; set; }
        public TeamScoreDto VisitorTeamScoreCard { get; set; }
        public bool HasScoreCard { get; set; }
        public bool HasBallByBall { get; set; }
        public string Season { get; set; }
    }

}
