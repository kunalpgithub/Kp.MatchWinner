using Kp.MatchWinner.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace Kp.MatchWinner.Controllers
{
    /* Inherit your controllers from this class.
     */
    public abstract class MatchWinnerController : AbpController
    {
        protected MatchWinnerController()
        {
            LocalizationResource = typeof(MatchWinnerResource);
        }
    }
}