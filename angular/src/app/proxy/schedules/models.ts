import type { AuditedEntityDto } from '@abp/ng.core';

export interface ScheduleDto extends AuditedEntityDto<string> {
  homeTeam: string;
  visitorTeam: string;
  location: string;
  showAnalysis: boolean;
  startDate: string;
  endDate: string;
}
