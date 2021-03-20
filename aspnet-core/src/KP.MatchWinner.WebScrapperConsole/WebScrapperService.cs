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
                _driver = new EdgeDriver(DRIVER_PATH, options);
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
        public List<TournamentMatchDto> BrowseSchedule(TournamentDto tournament, bool KeepBowserOpen = false, string url = "")
        {
            OpenBrowser();
            if (string.IsNullOrEmpty(url))
            {
                _driver.Url = $"https://www.espncricinfo.com/ci/engine/series/index.html?season={tournament.Season};view=season";
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
            wait.Until(waitForElement);
            //Read score card links.
            var matches = _driver.FindElements(By.CssSelector("section.matches-day-block>section"));

            List<TournamentMatchDto> scrapMatchList = new List<TournamentMatchDto>();
            foreach (var match in matches)
            {
                string date = match.FindElement(By.CssSelector("div.match-info>span.bold")).Text;
                string venue = match.FindElement(By.CssSelector("div.match-info>span.match-no>a")).Text;
                var startIndex = venue.IndexOf("Match at") + "Match at".Length;
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
                    ScoreCardUrl = scoreLink,
                    Venue = venue[startIndex..lastIndex],
                    Winner = matchStatus,
                    TournamentId = tournament.Id
                });

            }
            if (!KeepBowserOpen)
                CloseBrowser();
            return scrapMatchList;
        }

        public async Task<TournamentMatchDto> BrowseScore(TournamentMatchDto tournamentMatch, bool KeepBowserOpen = false)
        {
            OpenBrowser();
            _driver.Url = tournamentMatch.ScoreCardUrl;
            var html = _driver.FindElementByTagName("body").GetAttribute("innerHTML");
            if (!KeepBowserOpen)
                CloseBrowser();
            var config = Configuration.Default.WithDefaultLoader();
            var context = BrowsingContext.New(config);
            var document = await context.OpenAsync(req => req.Content(html));
            var matchHeader = document.QuerySelector("div.match-header");
            var teams = matchHeader.QuerySelectorAll("p.name");

            //foreach (var item in teams)
            //{
            //    Console.WriteLine(item.TextContent);
            //}
            //matchHeader.Where(m => m.LocalName == "p" && m.ClassList.Contains("name")).Select(x => x.TextContent);
            //matchHeader.Children.Where(m => m.LocalName == "span" && m.ClassList.Contains("score")).Select(x => x.TextContent);
            //var score = matchHeader.QuerySelectorAll("span.score");
            //foreach (var item in score)
            //{
            //    Console.WriteLine(item.TextContent);
            //}
            //tournamentMatch.HomeTeamScoreCard.Name = teams[0].TextContent.Trim();
            //tournamentMatch.HomeTeamScoreCard.Score = score[0].TextContent.Trim();
            //tournamentMatch.VisitorTeamScoreCard.Name = teams[1].TextContent.Trim();
            //tournamentMatch.VisitorTeamScoreCard.Score = score[1].TextContent.Trim();

            var scoreCards = document.QuerySelectorAll("div.card.content-block.match-scorecard-table");
            tournamentMatch.HomeTeamScoreCard = ParseScoreCard(scoreCards[0]);
            tournamentMatch.VisitorTeamScoreCard = ParseScoreCard(scoreCards[1]);
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
