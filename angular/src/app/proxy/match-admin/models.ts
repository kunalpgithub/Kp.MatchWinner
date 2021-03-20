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

export interface TeamScoreDto {
  batsmen: BatsManDto[];
  bowlers: BowlerDto[];
}

export interface TournamentDto extends FullAuditedEntityDto<string> {
  tournamentName: string;
  season: string;
  isAvailable: boolean;
}

export interface TournamentMatchDto extends FullAuditedEntityDto<string> {
  homeTeam: string;
  homeTeamScore: string;
  visitorTeam: string;
  visitorTeamScore: string;
  playedOn: string;
  venue: string;
  scoreCardUrl: string;
  winner: string;
  tournamentId: string;
  homeTeamScoreCard: TeamScoreDto;
  visitorTeamScoreCard: TeamScoreDto;
  hasScoreCard: boolean;
  hasBallByBall: boolean;
}
