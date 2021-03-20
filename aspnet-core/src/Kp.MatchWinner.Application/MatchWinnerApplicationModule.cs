using Kp.MatchWinner.MatchAdmin;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Account;
using Volo.Abp.AutoMapper;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.TenantManagement;

namespace Kp.MatchWinner
{
    [DependsOn(
        typeof(MatchWinnerDomainModule),
        typeof(AbpAccountApplicationModule),
        typeof(MatchWinnerApplicationContractsModule),
        typeof(AbpIdentityApplicationModule),
        typeof(AbpPermissionManagementApplicationModule),
        typeof(AbpTenantManagementApplicationModule),
        typeof(AbpFeatureManagementApplicationModule)
        )]
    public class MatchWinnerApplicationModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpAutoMapperOptions>(options =>
            {
                options.AddMaps<MatchWinnerApplicationModule>();
            });
            //context.Services.Add(ServiceDescriptor.Transient<ITournamentService, TournamentService>());
            //context.Services.AddScoped<ITournamentService>(sp => sp.GetRequiredService<TournamentService>());
            //context.Services.AddScoped<IMatchScheduleService>(sp => sp.GetRequiredService<MatchScheduleService>());
        }
    }
}
