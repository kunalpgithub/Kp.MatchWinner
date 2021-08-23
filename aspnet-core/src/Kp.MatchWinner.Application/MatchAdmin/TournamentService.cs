using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Kp.MatchWinner.MatchAdmin
{
    public class TournamentService : CrudAppService<Tournament, TournamentDto, Guid, PagedAndSortedResultRequestDto, TournamentDto, TournamentDto>, ITournamentService
    {
        private readonly IRepository<Tournament, Guid> _tournamentRepo;
        public TournamentService(IRepository<Tournament, Guid> tournamentRepo) : base(tournamentRepo)
        {
            _tournamentRepo = tournamentRepo;
        }

        public List<TournamentDto> GetTournamnetByAvailability(bool isAvailable)
        {
            var tournaments = _tournamentRepo.WhereIf(true, x => x.Seasons.Any(s => !s.IsAvailable))
                .Select(t => new TournamentDto
                {
                    Id = t.Id,
                    TournamentName = t.TournamentName,
                    Seasons = t.Seasons.Where(s => !s.IsAvailable).Select(s => new TournamentSeasonDto
                    {
                        Season = s.Season,
                        IsAvailable = s.IsAvailable
                    })
                }).ToList();
            //return ObjectMapper.Map<List<Tournament>, List<TournamentDto>>(tournaments);
            return tournaments;
        }

        public TournamentDto GetTournamentByName(string tournamentName)
        {
            var tournament = _tournamentRepo.FirstOrDefault(x => x.TournamentName.ToLower() == tournamentName.ToLower().Trim());
            if (tournament == null) throw new Exception($"Tournament with name {tournamentName} not found.");
            return ObjectMapper.Map<Tournament, TournamentDto>(tournament);
        }
    }
}
