using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using Microsoft.Edge.SeleniumTools;
using AngleSharp;
using AngleSharp.Dom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;
using Kp.MatchWinner.MatchAdmin;

namespace KP.MatchWinner.WebScrapperConsole
{
    public class WebScrapperService : ITransientDependency
    {
        private const string DRIVER_PATH = @"C:\Users\kunal\Downloads\edgedriver_win64";
        private EdgeDriver _driver;

        public WebScrapperService()
        {
            Headless = true;
        }

        public bool Headless { get; set; }

        private void OpenBrowser()
        {
            if (_driver == null)
            {
                Console.WriteLine("***********OPEN BROWSER***********");
                //CloseBrowser();
                var options = new EdgeOptions
                {
                    PageLoadStrategy = PageLoadStrategy.Normal,
                };
                //options.BinaryLocation = @"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe";
                options.UseChromium = true;
                if (Headless)
                {
                    options.AddArgument("headless");
                    options.AddArgument("window-size=1920,1080");
                }

                options.AddArgument("--blink-settings=imagesEnabled=false");
                options.AddArgument("disable-gpu");
               EdgeDriverService service = EdgeDriverService.CreateChromiumService(DRIVER_PATH);
                service.SuppressInitialDiagnosticInformation = true;
                service.HideCommandPromptWindow = true;
                _driver = new EdgeDriver(service, options);
                
                _driver.Manage().Window.Maximize();
            }

        }

        private void CloseBrowser()
        {
            if (_driver != null)
            {
                Console.WriteLine("***********CLOSE BROWSER***********");
                _driver.Quit();
            }
        }
        public List<TournamentMatchDto> BrowseSchedule(TournamentDto tournament,string season, bool KeepBowserOpen = false, string url = "")
        {
            OpenBrowser();
            if (string.IsNullOrEmpty(url))
            {
                _driver.Url = $"https://www.espncricinfo.com/ci/engine/series/index.html?season={season};view=season";
            }
            else
            {
                _driver.Url = url;
            }

            var iplLink = _driver.FindElement(By.LinkText(tournament.TournamentName));
            //Script to get element in center of screen, so its clickable.
            String scrollElementIntoMiddle = "var viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);"
                                            + "var elementTop = arguments[0].getBoundingClientRect().top;"
                                            + "window.scrollBy(0, elementTop-(viewPortHeight/2));";

            ((IJavaScriptExecutor)_driver).ExecuteScript(scrollElementIntoMiddle, iplLink);

            //Click Link
            iplLink.Click();

            //Wait for schedule to load.
            WebDriverWait wait = new WebDriverWait(_driver, TimeSpan.FromMinutes(1))
            {
                PollingInterval = TimeSpan.FromMilliseconds(500)
            };
            IWebElement[] scoreCardElements = null;
            Func<IWebDriver, bool> waitForElement = new Func<IWebDriver, bool>((IWebDriver web) =>
            {
                scoreCardElements = web.FindElements(By.LinkText("SCORECARD")).ToArray();
                if (scoreCardElements.Count() == 0)
                {
                    return false;
                }
                return true;
            });
            try
            {
                wait.Until(waitForElement);
            }
            catch (Exception)
            {

                return null;
            }
            
            //Read score card links.
            var matches = _driver.FindElements(By.CssSelector("section.matches-day-block>section"));

            List<TournamentMatchDto> scrapMatchList = new List<TournamentMatchDto>();
            foreach (var match in matches)
            {
                string date = match.FindElement(By.CssSelector("div.match-info>span.bold")).Text;
                string venue = match.FindElement(By.CssSelector("div.match-info>span.match-no>a")).Text;
                var startIndex = venue.IndexOf("Match at",StringComparison.InvariantCultureIgnoreCase) + "Match at".Length;
                var lastIndex = venue.IndexOf("(") != -1 ? venue.IndexOf("(") : venue.Length - 1;
                string homeTeamScore = match.FindElement(By.CssSelector("div.innings-info-1>span")).Text;
                string homeTeam = match.FindElement(By.CssSelector("div.innings-info-1")).Text;
                string visitorTeamScore = match.FindElement(By.CssSelector("div.innings-info-2>span")).Text;
                string visitorTeam = match.FindElement(By.CssSelector("div.innings-info-2")).Text;
                string matchStatus = match.FindElement(By.CssSelector("div.match-status")).Text;
                string scoreLink = "";
                try
                {
                    var scoreLinkElement = match.FindElement(By.LinkText("SCORECARD"));
                    if (scoreLinkElement != null)
                    {
                        scoreLink = scoreLinkElement.GetAttribute("href");
                    }
                }
                catch
                {
                }

                scrapMatchList.Add(new TournamentMatchDto
                {
                    HomeTeam = string.IsNullOrEmpty(homeTeamScore) ? homeTeam : homeTeam.Replace(homeTeamScore, "").Trim(),
                    HomeTeamScore = homeTeamScore.Trim(),
                    VisitorTeam = string.IsNullOrEmpty(visitorTeamScore) ? visitorTeam : visitorTeam.Replace(visitorTeamScore, "").Trim(),
                    VisitorTeamScore = visitorTeamScore.Trim(),
                    PlayedOn = date,
                    PlayedDate = DateTime.Parse(date),
                    ScoreCardUrl = scoreLink,
                    Venue = venue[startIndex..lastIndex],
                    Winner = matchStatus,
                    TournamentId = tournament.Id,
                    Season = season

                });
                Console.WriteLine($"{tournament.Id} -{season}-{homeTeam}-{visitorTeam}-{venue}");

            }
            if (!KeepBowserOpen)
                CloseBrowser();
            return scrapMatchList;
        }

        public async Task<TournamentMatchDto> BrowseScore(TournamentMatchDto tournamentMatch, bool KeepBowserOpen = false)
        {
            OpenBrowser();
            _driver.Url = tournamentMatch.ScoreCardUrl.Replace("live-cricket-score", "full-scorecard");
            var html = _driver.FindElementByTagName("body").GetAttribute("innerHTML");
            if (!KeepBowserOpen)
                CloseBrowser();
            var config = Configuration.Default.WithDefaultLoader();
            var context = BrowsingContext.New(config);
            var document = await context.OpenAsync(req => req.Content(html));
            var matchHeader = document.QuerySelector("div.match-header");
            //var teams = matchHeader.QuerySelectorAll("p.name");
            //var score = matchHeader.QuerySelectorAll("span.score");
            var winner = matchHeader.QuerySelector("div.status-text span").TextContent.Trim();
            tournamentMatch.Winner = winner;
            Console.WriteLine(winner);
            var scoreCards = document.QuerySelectorAll("div.card.content-block.match-scorecard-table");
            var FirstInning = ParseScoreCard(scoreCards[0]);
            var SecondInning = ParseScoreCard(scoreCards[1]);
            
            var teamName = scoreCards[0].QuerySelector("h5.header-title.label").TextContent;
            if (teamName.StartsWith(tournamentMatch.HomeTeam))
            {
                tournamentMatch.HomeTeamScoreCard = new TeamScoreDto() {  Score = FirstInning.Score, Batsmen = FirstInning.Batsmen, Bowlers = SecondInning.Bowlers };
                tournamentMatch.VisitorTeamScoreCard = new TeamScoreDto() { Score = SecondInning.Score,  Batsmen = SecondInning.Batsmen, Bowlers = FirstInning.Bowlers };
            }
            else 
            {
                tournamentMatch.VisitorTeamScoreCard= new TeamScoreDto() { Score =FirstInning.Score, Batsmen = FirstInning.Batsmen, Bowlers = SecondInning.Bowlers };
                tournamentMatch.HomeTeamScoreCard = new TeamScoreDto() { Score = SecondInning.Score, Batsmen = SecondInning.Batsmen, Bowlers = FirstInning.Bowlers };
            }

            return tournamentMatch;
        }

        private TeamScoreDto ParseScoreCard(IElement scoreCardElement)
        {
            TeamScoreDto tm = new TeamScoreDto();
            //tm.Name = team;
            //tm.Score = score;
            var batsmansTable = scoreCardElement.QuerySelector("table.batsman");
            var batsmanRow = batsmansTable.QuerySelectorAll("tr");
            foreach (var item in batsmanRow)
            {
                //Console.WriteLine(item.TextContent);
                var battingdata = item.QuerySelectorAll("td");
                if (battingdata.Length >= 8)
                {
                    tm.Batsmen.Add(new BatsManDto
                    {
                        Name = battingdata[0].TextContent,
                        WicketBy = battingdata[1].TextContent,
                        Run = Convert.ToInt32(battingdata[2].TextContent.Trim() == "-" ? 0 : battingdata[2].TextContent.Trim()),
                        Balls = Convert.ToInt32(battingdata[3].TextContent.Trim() == "-" ? 0 : battingdata[3].TextContent.Trim()),
                        Four = Convert.ToInt32(battingdata[5].TextContent.Trim() == "-" ? 0 : battingdata[5].TextContent.Trim()),
                        Six = Convert.ToInt32(battingdata[6].TextContent.Trim() == "-" ? 0 : battingdata[6].TextContent.Trim())
                    });
                }
                else if (battingdata.Length == 4 && battingdata[0].TextContent.ToUpper().Trim() == "TOTAL") {
                    tm.Score = battingdata[2].TextContent.Trim();
                    Console.WriteLine("Score" + tm.Score);
                }
            }

            var bowlersTable = scoreCardElement.QuerySelector("table.bowler");
            var bowlingRows = bowlersTable.QuerySelectorAll("tr");
            foreach (var item in bowlingRows)
            {
                //Console.WriteLine(item.TextContent);
                var bowlingData = item.QuerySelectorAll("td");
                if (bowlingData.Length >= 11)
                {
                    tm.Bowlers.Add(new BowlerDto
                    {
                        Name = bowlingData[0].TextContent,
                        Over = Convert.ToDouble(bowlingData[1].TextContent),
                        Run = Convert.ToInt32(bowlingData[3].TextContent),
                        Wicket = Convert.ToInt32(bowlingData[4].TextContent)
                    });
                }
            }
            return tm;
        }

    }
}
