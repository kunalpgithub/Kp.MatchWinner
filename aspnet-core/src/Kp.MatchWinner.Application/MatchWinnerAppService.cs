using System;
using System.Collections.Generic;
using System.Text;
using Kp.MatchWinner.Localization;
using Volo.Abp.Application.Services;

namespace Kp.MatchWinner
{
    /* Inherit your application services from this class.
     */
    public abstract class MatchWinnerAppService : ApplicationService
    {
        protected MatchWinnerAppService()
        {
            LocalizationResource = typeof(MatchWinnerResource);
        }
    }
}
