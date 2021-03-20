import type { TournamentMatchDto } from '../match-admin/models';

export interface MatchAnalysisReport {
  matchByTeam: TournamentMatchDto[];
  matchAgainstTeam: TournamentMatchDto[];
  matchBetweenTeam: TournamentMatchDto[];
  matchAtVenue: TournamentMatchDto[];
}
