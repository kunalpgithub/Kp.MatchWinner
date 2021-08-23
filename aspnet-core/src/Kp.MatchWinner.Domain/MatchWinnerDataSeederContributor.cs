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

        public MatchWinnerDataSeederContributor(IRepository<Tournament, Guid> tournamentRepo) //IRepository<Match, Guid> matchRepository,
        {
            //_matchRepository = matchRepository;
            _tournamentRepo = tournamentRepo;
        }

        public async Task SeedAsync(DataSeedContext context)
        {
            List<Tournament> tournamentList = new List<Tournament>() {
                new Tournament() { TournamentName= "Indian Premier League",
                                    Seasons = new List<TournamentSeason>{
                                        new TournamentSeason{ Season = "2016" },
                                        new TournamentSeason{ Season = "2017" },
                                        new TournamentSeason{ Season = "2018" },
                                        new TournamentSeason{ Season = "2019" },
                                        new TournamentSeason{ Season = "2020/21" },
                                    }
                },
                new Tournament() { TournamentName= "Pakistan Super League",
                                    Seasons = new List<TournamentSeason>{
                                        new TournamentSeason{ Season = "2015/16" },
                                        new TournamentSeason{ Season = "2016/17" },
                                        new TournamentSeason{ Season = "2017/18" },
                                        new TournamentSeason{ Season = "2018/19" },
                                        new TournamentSeason{ Season = "2019/20" },
                                        new TournamentSeason{ Season = "2020/21" },
                                    }
                },
                new Tournament() { TournamentName= "Caribbean Premier League",
                                    Seasons = new List<TournamentSeason>{
                                        new TournamentSeason{ Season = "2013" },
                                        new TournamentSeason{ Season = "2014" },
                                        new TournamentSeason{ Season = "2015" },
                                        new TournamentSeason{ Season = "2016" },
                                        new TournamentSeason{ Season = "2017" },
                                        new TournamentSeason{ Season = "2018" },
                                        new TournamentSeason{ Season = "2019" },
                                        new TournamentSeason{ Season = "2020" },
                                        new TournamentSeason{ Season = "2021" },
                                        new TournamentSeason{ Season = "2022" },
                                    }
                }
            };
            //Pakistan Super League
            var dbTournamentList = await _tournamentRepo.GetListAsync();
            var newList = tournamentList.Except(dbTournamentList, new TournamentComparer());

            foreach (var item in newList)
            {
                await _tournamentRepo.InsertAsync(item);
            }
        }
    }
}
