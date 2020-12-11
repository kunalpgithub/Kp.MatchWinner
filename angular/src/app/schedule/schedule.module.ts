import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ScheduleComponent],
  imports: [SharedModule, ScheduleRoutingModule],
})
export class ScheduleModule {}
