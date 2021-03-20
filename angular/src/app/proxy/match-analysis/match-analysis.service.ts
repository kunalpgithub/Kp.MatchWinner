import type { MatchAnalysisReport } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MatchAnalysisService {
  apiName = 'Default';

  getMatchAnalysisByHomeTeamAndVisitorTeamAndVenue = (homeTeam: string, visitorTeam: string, venue: string) =>
    this.restService.request<any, MatchAnalysisReport>({
      method: 'GET',
      url: `/api/app/matchAnalysis/matchAnalysis`,
      params: { homeTeam: homeTeam, visitorTeam: visitorTeam, venue: venue },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
