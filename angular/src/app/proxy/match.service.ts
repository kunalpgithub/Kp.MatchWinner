import type { MatchAnalysisDto, MatchFiltersDto, TeamFiltersDto } from './matches/models';
import type { IFormFile } from './microsoft/asp-net-core/http/models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  apiName = 'Default';

  getMatchAnalysisByTeamNameAndOpponentTeamAndVenue = (TeamName: string, OpponentTeam: string, Venue: string) =>
    this.restService.request<any, MatchAnalysisDto>({
      method: 'GET',
      url: `/api/app/match/matchAnalysis`,
      params: { teamName: TeamName, opponentTeam: OpponentTeam, venue: Venue },
    },
    { apiName: this.apiName });

  getMatchFilters = () =>
    this.restService.request<any, MatchFiltersDto>({
      method: 'GET',
      url: `/api/app/match/matchFilters`,
    },
    { apiName: this.apiName });

  getTeamFiltersByTeam = (Team: string) =>
    this.restService.request<any, TeamFiltersDto>({
      method: 'GET',
      url: `/api/app/match/teamFilters`,
      params: { team: Team },
    },
    { apiName: this.apiName });

  upload = (File: IFormFile) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: `/api/app/match/upload`,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
