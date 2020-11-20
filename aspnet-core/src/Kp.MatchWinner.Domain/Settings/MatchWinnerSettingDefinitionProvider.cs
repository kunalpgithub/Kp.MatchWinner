using Volo.Abp.Settings;

namespace Kp.MatchWinner.Settings
{
    public class MatchWinnerSettingDefinitionProvider : SettingDefinitionProvider
    {
        public override void Define(ISettingDefinitionContext context)
        {
            //Define your own settings here. Example:
            //context.Add(new SettingDefinition(MatchWinnerSettings.MySetting1));
        }
    }
}
