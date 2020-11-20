using System.Threading.Tasks;

namespace Kp.MatchWinner.Data
{
    public interface IMatchWinnerDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
