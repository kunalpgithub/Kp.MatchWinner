import { Component, Input, OnInit } from '@angular/core';
import { MatchScoreDto } from '@proxy/matches';

@Component({
  selector: 'app-match-score',
  templateUrl: './match-score.component.html',
  styleUrls: ['./match-score.component.scss'],
})
export class MatchScoreComponent implements OnInit {
  @Input() matchScores: MatchScoreDto;
  @Input() showTeam: string = '';
  constructor() {}

  ngOnInit(): void {}
}
