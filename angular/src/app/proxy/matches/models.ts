
export interface MatchAnalysisDto {
  matchScores: MatchScoreDto[];
  homeTeamVenueMatchScores: MatchScoreDto[];
  visitorTeamVenueMatchScores: MatchScoreDto[];
  playerBattles: PlayerBattleDto[];
}

export interface MatchFiltersDto {
  teams: string[];
  venues: string[];
  batsMen: string[];
  bowlers: string[];
}

export interface MatchScoreDto {
  hostTeam: TeamScoreDto;
  visitorTeam: TeamScoreDto;
  venue: string;
  city: string;
  matchDate: string;
}

export interface PlayerBattleDto {
  batsman: string;
  bowler: string;
  runs: number;
  balls: number;
  wickets: number;
}

export interface PlayerScoreDto {
  playerName: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  wickets: number;
}

export interface TeamFiltersDto {
  batsmen: string[];
  bowlers: string[];
}

export interface TeamScoreDto {
  team: string;
  batsmen: PlayerScoreDto[];
  bowlers: PlayerScoreDto[];
  extra: number;
}
