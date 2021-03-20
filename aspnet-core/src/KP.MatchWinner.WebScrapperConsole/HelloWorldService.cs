using System;
using Volo.Abp.DependencyInjection;

namespace KP.MatchWinner.WebScrapperConsole
{
    public class HelloWorldService : ITransientDependency
    {
        public void SayHello()
        {
            Console.WriteLine("Hello World!");
        }
    }
}
