import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchesComponent } from './matches.component';

const routes: Routes = [
  { path: '', component: MatchesComponent },
  // { path: 'Match/MatchData', component: MatchDataComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchesRoutingModule {}
