﻿using AutoMapper;
using Kp.MatchWinner.Matches;
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
            CreateMap<MatchScore, MatchScoreDto>();
            CreateMap<TeamScore, TeamScoreDto>();
            CreateMap<PlayerScore, PlayerScoreDto>();
            CreateMap<Score, ScoreDto>();

        }
    }
}
