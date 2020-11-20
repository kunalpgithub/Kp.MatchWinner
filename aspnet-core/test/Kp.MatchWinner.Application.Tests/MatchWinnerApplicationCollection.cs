using Kp.MatchWinner.MongoDB;
using Xunit;

namespace Kp.MatchWinner
{
    [CollectionDefinition(MatchWinnerTestConsts.CollectionDefinitionName)]
    public class MatchWinnerApplicationCollection : MatchWinnerMongoDbCollectionFixtureBase
    {

    }
}
