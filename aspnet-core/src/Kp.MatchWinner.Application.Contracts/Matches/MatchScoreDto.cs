using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace Kp.MatchWinner.Matches
{
    //public class MatchDto 
    //{
    //    public TeamScoreDto HostTeam { get; set; }
    //    public TeamScoreDto VisitorTeam { get; set; }
    //    public string Venue { get; set; }
    //    public string City { get; set; }
    //    public DateTime MatchDate { get; set; }
    //}
    public class MatchScoreDto : AuditedEntityDto<Guid>
    {
        public TeamScoreDto HostTeam { get; set; }
        public TeamScoreDto VisitorTeam { get; set; }
        public string Venue { get; set; }
        public string City { get; set; }
        public DateTime MatchDate { get; set; }
    }

    public class TeamScoreDto
    {
        public string Team { get; set; }
        public List<PlayerScoreDto> Batsmen { get; set; }
        public List<PlayerScoreDto> Bowlers { get; set; }
        public int Extra { get; set; }
    }

    //public class PlayerScoreDto
    //{
    //    public string PlayerName { get; set; }
    //    public ScoreDto Batting { get; set; }
    //    public ScoreDto Bowling { get; set; }
    //}

    public class PlayerScoreDto
    {
        public string PlayerName { get; set; }
        public int Runs { get; set; }
        public int Balls { get; set; }
        public int Fours { get; set; }
        public int Sixes { get; set; }
        public int Wickets { get; set; }

    }
}
