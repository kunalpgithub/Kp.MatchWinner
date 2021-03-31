using AutoMapper;
using Kp.MatchWinner.MatchAdmin;
//using Kp.MatchWinner.Matches;
//using Kp.MatchWinner.Schedules;
using System;

namespace Kp.MatchWinner
{
    public class MatchWinnerApplicationAutoMapperProfile : Profile
    {
        public MatchWinnerApplicationAutoMapperProfile()
        {
            /* You can configure your AutoMapper mapping configuration here.
             * Alternatively, you can split your mapping configurations
             * into multiple profile classes for a better organization. */
            //CreateMap<Matches.MatchAnalysis, MatchAnalysisDto>();
            //CreateMap<Matches.MatchScore, Matches.MatchScoreDto>();
            //CreateMap<Matches.TeamScore, Matches.TeamScoreDto>();
            //CreateMap<PlayerScore, PlayerScoreDto>();
            //CreateMap<PlayerBattle, PlayerBattleDto>();
            //CreateMap<Schedule, ScheduleDto>().ReverseMap();

            //MatchAdmin entity mapping.
            CreateMap<Tournament, TournamentDto>().ReverseMap();
            CreateMap<TournamentSeason, TournamentSeasonDto>().ReverseMap();
            CreateMap<TournamentMatch, TournamentMatchDto>().ReverseMap().ForMember(x=>x.PlayedDate,opt=>opt.MapFrom(x=>DateTime.Parse(x.PlayedOn))); ;
            CreateMap<TournamentMatch, TournamentMatchDto>().ReverseMap(); ;
            CreateMap<MatchAdmin.TeamScore, MatchAdmin.TeamScoreDto>().ReverseMap(); ;
            CreateMap<BatsMan, BatsManDto>().ReverseMap(); ;
            CreateMap<Bowler, BowlerDto>().ReverseMap(); ;
        }
    }
}
