import type { TournamentDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  apiName = 'Default';

  create = (input: TournamentDto) =>
    this.restService.request<any, TournamentDto>({
      method: 'POST',
      url: `/api/app/tournament`,
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/tournament/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, TournamentDto>({
      method: 'GET',
      url: `/api/app/tournament/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<TournamentDto>>({
      method: 'GET',
      url: `/api/app/tournament`,
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getTournamnetByAvailabilityByIsAvailable = (isAvailable: boolean) =>
    this.restService.request<any, TournamentDto[]>({
      method: 'GET',
      url: `/api/app/tournament/tournamnetByAvailability`,
      params: { isAvailable: isAvailable },
    },
    { apiName: this.apiName });

  update = (id: string, input: TournamentDto) =>
    this.restService.request<any, TournamentDto>({
      method: 'PUT',
      url: `/api/app/tournament/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
