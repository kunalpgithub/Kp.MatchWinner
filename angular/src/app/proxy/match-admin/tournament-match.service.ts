import type { TournamentMatchDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TournamentMatchService {
  apiName = 'Default';

  create = (input: TournamentMatchDto) =>
    this.restService.request<any, TournamentMatchDto>({
      method: 'POST',
      url: `/api/app/tournamentMatch`,
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/tournamentMatch/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, TournamentMatchDto>({
      method: 'GET',
      url: `/api/app/tournamentMatch/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<TournamentMatchDto>>({
      method: 'GET',
      url: `/api/app/tournamentMatch`,
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getMatchesByTournamentIdAndSeason = (tournamentId: string, season: string) =>
    this.restService.request<any, TournamentMatchDto[]>({
      method: 'GET',
      url: `/api/app/tournamentMatch/matches/${tournamentId}`,
      params: { season: season },
    },
    { apiName: this.apiName });

  update = (id: string, input: TournamentMatchDto) =>
    this.restService.request<any, TournamentMatchDto>({
      method: 'PUT',
      url: `/api/app/tournamentMatch/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}