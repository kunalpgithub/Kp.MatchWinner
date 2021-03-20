using Ical.Net;
using Microsoft.AspNetCore.Http;
using Kp.MatchWinner.Matches;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using System.IO.Compression;
using System.Diagnostics;

namespace Kp.MatchWinner
{
    public class MatchService : ApplicationService, IMatchService //CrudAppService<Match, MatchDto, Guid, PagedAndSortedResultRequestDto, MatchDto>, IMatchService
    {
        readonly IRepository<Match, Guid> _repository;
        readonly MatchManager _matchManager;
        public MatchService(IRepository<Match, Guid> repository, MatchManager matchManager) //: base(repository)
        {
            _repository = repository;
            _matchManager = matchManager;
        }
        public MatchFiltersDto GetMatchFilters()
        {
            MatchFiltersDto dto = new MatchFiltersDto
            {
                Teams = _repository.SelectMany(m => m.Info.Teams).Distinct().ToArray(),
                Venues = _repository.Select(m => m.Info.Venue + "," + m.Info.City).Distinct().ToArray()

            };

            return dto;
        }

        public TeamFiltersDto GetTeamFilters(string Team)
        {
            var matchTeam = _repository.Where(x => x.Info.Teams.Any(t => t == Team && x.Info.Dates.Any(x => x >= DateTime.Now.AddYears(-2))));
            TeamFiltersDto dto = new TeamFiltersDto
            {
                Batsmen = matchTeam.SelectMany(x => x.Innings.Select(x => x.Values.First())).SelectMany(x => x.Deliveries.Select(x => x.Values.First())).GroupBy(x => x.Batsman).Select(x => x.Key).ToArray(),
                Bowlers = matchTeam.SelectMany(x => x.Innings.Select(x => x.Values.First())).SelectMany(x => x.Deliveries.Select(x => x.Values.First())).GroupBy(x => x.Bowler).Select(x => x.Key).ToArray()
            };
            return dto;
        }

        public MatchAnalysisDto GetMatchAnalysis(string TeamName, string OpponentTeam, string Venue)
        {
            return ObjectMapper.Map<Matches.MatchAnalysis, MatchAnalysisDto>(_matchManager.GetMatchAnalysis(TeamName, OpponentTeam, Venue));
        }

        public async Task<bool> UploadAsync(IFormFile File)
        {
            ContentDispositionHeaderValue.Parse(File.ContentDisposition);
            //using (var streamReader = new System.IO.StreamReader(File.OpenReadStream()))
            //{
            //    await _matchManager.UploadMatchFromYAML(await streamReader.ReadToEndAsync());
            //}
            
            using (var file = File.OpenReadStream())
            using (ZipArchive archive = new ZipArchive(file, ZipArchiveMode.Read))
            {
                foreach (ZipArchiveEntry entry in archive.Entries)
                {
                    Debug.WriteLine(entry.FullName);
                    if (entry.FullName.EndsWith(".yaml", StringComparison.OrdinalIgnoreCase))
                    {
                        using var stream = new System.IO.StreamReader(entry.Open());
                        string data = await stream.ReadToEndAsync();
                        await _matchManager.UploadMatchFromYAML(data);
                    }
                }
            }
            //foreach (var file in Files)                            
            //{
            //    ContentDispositionHeaderValue.Parse(file.ContentDisposition);
            //    using (var streamReader = new System.IO.StreamReader(file.OpenReadStream()))
            //    {
            //        await _matchManager.UploadMatchFromYAML(await streamReader.ReadToEndAsync());
            //    }
            //}
            return true;
        }

    }
}
