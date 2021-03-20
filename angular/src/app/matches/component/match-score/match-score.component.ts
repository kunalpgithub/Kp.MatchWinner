import { Component, Input, OnInit } from '@angular/core';
import { TournamentMatchDto } from '@proxy/match-admin';

@Component({
  selector: 'app-match-score',
  templateUrl: './match-score.component.html',
  styleUrls: ['./match-score.component.scss'],
})
export class MatchScoreComponent implements OnInit {
  @Input() matchScores: TournamentMatchDto;
  @Input() showTeam: string = '';
  constructor() {}

  ngOnInit(): void {}
}
