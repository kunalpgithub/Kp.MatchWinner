using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Entities.Auditing;

namespace Kp.MatchWinner.MatchAdmin
{
    //public class MatchScoreCardsDto: FullAuditedEntityDto<Guid>
        
    //{
    //    public MatchScoreCardsDto()
    //    {
    //        HomeTeam = new TeamDto();
    //        VisitorTeam = new TeamDto();
    //    }
    //    public TeamDto HomeTeam { get; set; }
    //    public TeamDto VisitorTeam { get; set; }
    //    public Guid MatchScheduleId { get; set; }
    //    public string Venue { get; set; }
    //    public DateTime PlayedDate { get; set; }
    //}
    public class TeamScoreDto
    {
        public TeamScoreDto()
        {
            Batsmen = new List<BatsManDto>();
            Bowlers = new List<BowlerDto>();
        }
        //public string Name { get; set; }
        //public string Score { get; set; }
        public List<BatsManDto> Batsmen { get; set; }
        public List<BowlerDto> Bowlers { get; set; }

    }
    public class BatsManDto
    {
        public string Name { get; set; }
        public string WicketBy { get; set; }
        public int Run { get; set; }
        public int Balls { get; set; }
        public int Four { get; set; }
        public int Six { get; set; }
    }
    public class BowlerDto
    {
        public string Name { get; set; }
        public double Over { get; set; }
        public int Run { get; set; }
        public int Wicket { get; set; }
    }
}
