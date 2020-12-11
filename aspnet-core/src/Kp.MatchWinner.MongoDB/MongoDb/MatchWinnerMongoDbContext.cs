using MongoDB.Driver;
using Kp.MatchWinner.Users;
using Volo.Abp.Data;
using Volo.Abp.MongoDB;
using Kp.MatchWinner.Matches;
using Kp.MatchWinner.Schedules;

namespace Kp.MatchWinner.MongoDB
{
    [ConnectionStringName("Default")]
    public class MatchWinnerMongoDbContext : AbpMongoDbContext
    {
        public IMongoCollection<AppUser> Users => Collection<AppUser>();
        public IMongoCollection<Match> Matches => Collection<Match>();
        public IMongoCollection<Schedule> Schedules => Collection<Schedule>();

        protected override void CreateModel(IMongoModelBuilder modelBuilder)
        {
            base.CreateModel(modelBuilder);

            modelBuilder.Entity<AppUser>(b =>
            {
                /* Sharing the same "AbpUsers" collection
                 * with the Identity module's IdentityUser class. */
                b.CollectionName = "AbpUsers";
            });
        }
    }
}
