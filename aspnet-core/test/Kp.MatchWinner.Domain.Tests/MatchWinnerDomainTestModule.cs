using Kp.MatchWinner.MongoDB;
using Volo.Abp.Modularity;

namespace Kp.MatchWinner
{
    [DependsOn(
        typeof(MatchWinnerMongoDbTestModule)
        )]
    public class MatchWinnerDomainTestModule : AbpModule
    {

    }
}