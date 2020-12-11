import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
// import { CommonModule } from '@angular/common';

import { MatchesRoutingModule } from './matches-routing.module';
import { MatchesComponent } from './matches.component';
import { TeamScoreComponent } from './component/team-score/team-score.component';
import { PlayerBattleComponent } from './component/player-battle/player-battle.component';
import { MatchAnalysisComponent } from './component/match-analysis/match-analysis.component';
import { MatchDataComponent } from './match-data/match-data.component';
import { MatchScoreComponent } from './component/match-score/match-score.component';

@NgModule({
  declarations: [
    MatchesComponent,
    TeamScoreComponent,
    PlayerBattleComponent,
    MatchAnalysisComponent,
    MatchDataComponent,
    MatchScoreComponent,
  ],
  imports: [
    SharedModule,
    // CommonModule,
    MatchesRoutingModule,
  ],
})
export class MatchesModule {}
