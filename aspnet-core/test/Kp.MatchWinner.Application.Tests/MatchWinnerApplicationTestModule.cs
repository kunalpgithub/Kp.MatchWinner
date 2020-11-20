using Volo.Abp.Modularity;

namespace Kp.MatchWinner
{
    [DependsOn(
        typeof(MatchWinnerApplicationModule),
        typeof(MatchWinnerDomainTestModule)
        )]
    public class MatchWinnerApplicationTestModule : AbpModule
    {

    }
}