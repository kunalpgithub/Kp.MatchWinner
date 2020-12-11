import type { ScheduleDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { IFormFile } from '../microsoft/asp-net-core/http/models';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  apiName = 'Default';

  createScheduleBySchedules = (schedules: ScheduleDto[]) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: `/api/app/schedule/schedule`,
      body: schedules,
    },
    { apiName: this.apiName });

  getSchedule = () =>
    this.restService.request<any, ScheduleDto[]>({
      method: 'GET',
      url: `/api/app/schedule/schedule`,
    },
    { apiName: this.apiName });

  upload = (File: IFormFile) =>
    this.restService.request<any, ScheduleDto[]>({
      method: 'POST',
      url: `/api/app/schedule/upload`,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
