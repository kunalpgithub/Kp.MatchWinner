//using Kp.MatchWinner.MatchAdmin;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Linq.Expressions;
//using System.Text;
//using System.Threading.Tasks;
//using Volo.Abp.Domain.Repositories;
//using Volo.Abp.Domain.Services;

//namespace Kp.MatchWinner.MatchReport
//{
//    /// <summary>
//    /// This serivce calss has all methods to analyse match data and return response.
//    /// </summary>
//    public class MatchReportService : DomainService
//    {
//        readonly IRepository<MatchScoreCards, Guid> _matchScoreCardRepo;
//        readonly IRepository<MatchSchedule, Guid> _matchScheduleRepo;
//        public int MaxMatches = 5;

//        public MatchReportService(IRepository<MatchScoreCards, Guid> matchScoreCardRepo,IRepository<MatchSchedule,Guid> matchScheduleService)
//        {
//            _matchScoreCardRepo = matchScoreCardRepo;
//            _matchScheduleRepo = matchScheduleService;
//        }

//        public async Task<MatchScoreCards> GetLastMatchesPlayedAgainstTeam(string hometeam, string visitorTeam)
//        {
//            Expression<Func<MatchSchedule, bool>> findTeam = x => (x.HomeTeam == hometeam || x.HomeTeam == visitorTeam) && (x.VisitorTeam == visitorTeam || x.VisitorTeam == hometeam);
//            var schedules = _matchScheduleRepo.Where(findTeam);
//            var matches = _matchScoreCardRepo.Where(x => x.Id != Guid.Empty);

//            var query = from s in schedules
//                        join m in matches on s.Id equals m.MatchScheduleId
//                        select m;
//            var result = query.ToList();
//        }

//        public async Task<MatchScoreCards> GetLastMatchesPlayedByTeam(string homeTeam)
//        {
//            Expression<Func<MatchScoreCards, bool>> findTeam = x => (x.HomeTeam.Name == homeTeam || x.VisitorTeam.Name == homeTeam);
//            return await _matchScoreCardRepo.FindAsync(findTeam);
//        }

//        //public async Task<MatchScoreCards> GetLastMatchesPlayedAtVenue(string homeTeam,string venue)
//        //{
//        //    Expression<Func<MatchScoreCards, bool>> findTeam = x => (x.HomeTeam.Name == homeTeam || x.VisitorTeam.Name == homeTeam) && (x. == visitorTeam || x.VisitorTeam.Name == hometeam);
//        //    return await _matchScoreCardService.FindAsync(findTeam);
//        //}

//        public void GetTopBatsMen(List<MatchScoreCards> matchScores)
//        {
//            //matchScores.Select(x=>x.HomeTeam.Batsmen).Where
//        }
//        public void GetTopBowlers()
//        {
//        }

//    }
//}
