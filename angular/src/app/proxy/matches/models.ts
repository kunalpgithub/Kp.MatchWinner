import type { AuditedEntityDto } from '@abp/ng.core';

export interface MatchDto extends AuditedEntityDto<string> {
  hostTeam: TeamScoreDto;
  visitorTeam: TeamScoreDto;
  venue: string;
  city: string;
  matchDate: string;
}

export interface MatchScoreDto {
  hostTeam: TeamScoreDto;
  visitorTeam: TeamScoreDto;
  venue: string;
  city: string;
  matchDate: string;
}

export interface PlayerScoreDto {
  playerName: string;
  batting: ScoreDto;
  bowling: ScoreDto;
}

export interface ScoreDto {
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  wickets: number;
}

export interface TeamScoreDto {
  team: string;
  players: PlayerScoreDto[];
  extra: number;
}
