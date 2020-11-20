using Volo.Abp.Http.Client.IdentityModel;
using Volo.Abp.Modularity;

namespace Kp.MatchWinner.HttpApi.Client.ConsoleTestApp
{
    [DependsOn(
        typeof(MatchWinnerHttpApiClientModule),
        typeof(AbpHttpClientIdentityModelModule)
        )]
    public class MatchWinnerConsoleApiClientModule : AbpModule
    {
        
    }
}
