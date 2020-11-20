using Kp.MatchWinner.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace Kp.MatchWinner.Permissions
{
    public class MatchWinnerPermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            var myGroup = context.AddGroup(MatchWinnerPermissions.GroupName);

            //Define your own permissions here. Example:
            //myGroup.AddPermission(MatchWinnerPermissions.MyPermission1, L("Permission:MyPermission1"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<MatchWinnerResource>(name);
        }
    }
}
