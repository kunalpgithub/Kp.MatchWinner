using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace Kp.MatchWinner.Data
{
    /* This is used if database provider does't define
     * IMatchWinnerDbSchemaMigrator implementation.
     */
    public class NullMatchWinnerDbSchemaMigrator : IMatchWinnerDbSchemaMigrator, ITransientDependency
    {
        public Task MigrateAsync()
        {
            return Task.CompletedTask;
        }
    }
}