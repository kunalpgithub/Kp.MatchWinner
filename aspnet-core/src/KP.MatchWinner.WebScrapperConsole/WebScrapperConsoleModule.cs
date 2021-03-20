using Kp.MatchWinner;
using Kp.MatchWinner.MatchAdmin;
using Kp.MatchWinner.MongoDB;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Volo.Abp.AspNetCore.Serilog;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace KP.MatchWinner.WebScrapperConsole
{

    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(MatchWinnerApplicationModule),
        typeof(MatchWinnerMongoDbModule),
        typeof(AbpAspNetCoreSerilogModule)
    )]
    
    public class WebScrapperConsoleModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            var configuration = context.Services.GetConfiguration();
            var hostEnvironment = context.Services.GetSingletonInstance<IHostEnvironment>();
            context.Services.AddHostedService<WebScrapperConsoleHostedService>();
            
        }
    }
}
