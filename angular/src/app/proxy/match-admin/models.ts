import type { FullAuditedEntityDto } from '@abp/ng.core';

export interface BatsManDto {
  name: string;
  wicketBy: string;
  run: number;
  balls: number;
  four: number;
  six: number;
}

export interface BowlerDto {
  name: string;
  over: number;
  run: number;
  wicket: number;
}

export interface CurrentTournamentDto {
  tournamentId: string;
  tournamentName: string;
  season: string;
}

export interface TeamScoreDto {
  batsmen: BatsManDto[];
  bowlers: BowlerDto[];
}

export interface TournamentDto extends FullAuditedEntityDto<string> {
  tournamentName: string;
  seasons: TournamentSeasonDto[];
}

export interface TournamentMatchDto extends FullAuditedEntityDto<string> {
  homeTeam: string;
  homeTeamScore: string;
  visitorTeam: string;
  visitorTeamScore: string;
  playedOn: string;
  playedDate: string;
  venue: string;
  scoreCardUrl: string;
  winner: string;
  tournamentId: string;
  homeTeamScoreCard: TeamScoreDto;
  visitorTeamScoreCard: TeamScoreDto;
  hasScoreCard: boolean;
  hasBallByBall: boolean;
  season: string;
}

export interface TournamentSeasonDto {
  season: string;
  isAvailable: boolean;
}
