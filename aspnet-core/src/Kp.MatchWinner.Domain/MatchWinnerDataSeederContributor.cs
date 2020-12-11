using Kp.MatchWinner.Matches;
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
        private readonly IRepository<Match, Guid> _matchRepository;

        public MatchWinnerDataSeederContributor(IRepository<Match, Guid> matchRepository)
        {
            _matchRepository = matchRepository;
        }

        public async Task SeedAsync(DataSeedContext context)
        {
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
