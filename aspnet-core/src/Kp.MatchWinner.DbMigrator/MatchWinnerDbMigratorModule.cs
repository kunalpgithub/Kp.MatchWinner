using Kp.MatchWinner.MongoDB;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace Kp.MatchWinner.DbMigrator
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(MatchWinnerMongoDbModule),
        typeof(MatchWinnerApplicationContractsModule)
        )]
    public class MatchWinnerDbMigratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
        }
    }
}
