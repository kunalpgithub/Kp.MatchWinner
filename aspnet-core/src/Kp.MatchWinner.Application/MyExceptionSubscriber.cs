using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.ExceptionHandling;

namespace Kp.MatchWinner
{
    public class MyExceptionSubscriber : ExceptionSubscriber
    {
        public override Task HandleAsync(ExceptionNotificationContext context)
        {
             
            return Task.FromException(context.Exception);
        }
    }
}
