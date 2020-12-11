import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchDataComponent } from './match-data/match-data.component';

import { MatchesComponent } from './matches.component';

const routes: Routes = [
  { path: '', component: MatchesComponent },
  { path: 'Match/MatchData', component: MatchDataComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchesRoutingModule {}
