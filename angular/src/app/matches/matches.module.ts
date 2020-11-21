import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
// import { CommonModule } from '@angular/common';

import { MatchesRoutingModule } from './matches-routing.module';
import { MatchesComponent } from './matches.component';
import { TeamScoreComponent } from './component/team-score/team-score.component';

@NgModule({
  declarations: [MatchesComponent, TeamScoreComponent],
  imports: [
    SharedModule,
    // CommonModule,
    MatchesRoutingModule,
  ],
})
export class MatchesModule {}
