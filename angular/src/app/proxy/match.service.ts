import type { MatchDto, MatchScoreDto } from './matches/models';
import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  apiName = 'Default';

  create = (input: MatchDto) =>
    this.restService.request<any, MatchDto>({
      method: 'POST',
      url: `/api/app/match`,
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/match/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, MatchDto>({
      method: 'GET',
      url: `/api/app/match/${id}`,
    },
    { apiName: this.apiName });

  getAllTeams = () =>
    this.restService.request<any, string[]>({
      method: 'GET',
      url: `/api/app/match/teams`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<MatchDto>>({
      method: 'GET',
      url: `/api/app/match`,
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getMatchScoreByTeamName = (TeamName: string) =>
    this.restService.request<any, MatchScoreDto>({
      method: 'GET',
      url: `/api/app/match/matchScore`,
      params: { teamName: TeamName },
    },
    { apiName: this.apiName });

  update = (id: string, input: MatchDto) =>
    this.restService.request<any, MatchDto>({
      method: 'PUT',
      url: `/api/app/match/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
