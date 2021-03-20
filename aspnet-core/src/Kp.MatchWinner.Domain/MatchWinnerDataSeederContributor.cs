using Kp.MatchWinner.MatchAdmin;
//using Kp.MatchWinner.Matches;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

namespace Kp.MatchWinner
{
    public class MatchWinnerDataSeederContributor : IDataSeedContributor, ITransientDependency
    {
        //private readonly IRepository<Match, Guid> _matchRepository;
        private readonly IRepository<Tournament, Guid> _tournamentRepo;

        public MatchWinnerDataSeederContributor( IRepository<Tournament, Guid> tournamentRepo) //IRepository<Match, Guid> matchRepository,
        {
            //_matchRepository = matchRepository;
            _tournamentRepo = tournamentRepo;
        }

        public async Task SeedAsync(DataSeedContext context)
        {
            List<Tournament> tournamentList = new List<Tournament>() {
                new Tournament() { TournamentName= "Indian Premier League", Season = "2020/21" },
                new Tournament() { TournamentName = "Indian Premier League", Season = "2019" },
                new Tournament() { TournamentName = "Indian Premier League", Season = "2018" },
                new Tournament() { TournamentName = "Indian Premier League", Season = "2017" },
                new Tournament() { TournamentName = "Indian Premier League", Season = "2016" },
                new Tournament() { TournamentName = "Pakistan Super League", Season = "2015/16" },
                new Tournament() { TournamentName = "Pakistan Super League", Season = "2016/17" },
                new Tournament() { TournamentName = "Pakistan Super League", Season = "2017/18" },
                new Tournament() { TournamentName = "Pakistan Super League", Season = "2018/19" },
                new Tournament() { TournamentName = "Pakistan Super League", Season = "2019/20" },
                new Tournament() { TournamentName = "Pakistan Super League", Season = "2020/21" },
            };
            //Pakistan Super League
            var dbTournamentList = await _tournamentRepo.GetListAsync();
            var newList = tournamentList.Except(dbTournamentList, new TournamentComparer());

            foreach (var item in newList)
            {
               await _tournamentRepo.InsertAsync(item);
            }

            //if (await _matchRepository.GetCountAsync() <= 0)
            //{
            //    var files = System.IO.Directory.GetFiles(@"C:\Users\kunal\OneDrive\Documents\ipl","*.yaml");
            //    foreach (var file in files)
            //    {
            //        string yaml = System.IO.File.ReadAllText(file);
            //        INamingConvention underScoredNaming = new UnderscoredNamingConvention();
            //        var deserializer = new DeserializerBuilder()
            //            .WithNamingConvention(underScoredNaming)
            //            .Build();
            //        var item = deserializer.Deserialize<Match>(yaml);
            //        await _matchRepository.InsertAsync(item,autoSave:true);


            //    }
            //}
        }
    }
}
