﻿using System;
using System.Threading.Tasks;
using Kp.MatchWinner.Users;
using MongoDB.Driver.Linq;
using Shouldly;
using Volo.Abp.Domain.Repositories;
using Xunit;

namespace Kp.MatchWinner.MongoDB.Samples
{
    /* This is just an example test class.
     * Normally, you don't test ABP framework code
     * (like default AppUser repository IRepository<AppUser, Guid> here).
     * Only test your custom repository methods.
     */
    [Collection(MatchWinnerTestConsts.CollectionDefinitionName)]
    public class SampleRepositoryTests : MatchWinnerMongoDbTestBase
    {
        private readonly IRepository<AppUser, Guid> _appUserRepository;

        public SampleRepositoryTests()
        {
            _appUserRepository = GetRequiredService<IRepository<AppUser, Guid>>();
        }

        [Fact]
        public async Task Should_Query_AppUser()
        {
            /* Need to manually start Unit Of Work because
             * FirstOrDefaultAsync should be executed while db connection / context is available.
             */
            await WithUnitOfWorkAsync(async () =>
            {
                //Act
                var adminUser = await _appUserRepository
                    .GetMongoQueryable()
                    .FirstOrDefaultAsync(u => u.UserName == "admin");

                //Assert
                adminUser.ShouldNotBeNull();
            });
        }
    }
}
