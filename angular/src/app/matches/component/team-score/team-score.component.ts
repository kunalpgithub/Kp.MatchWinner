import { Component, Input, OnInit } from '@angular/core';
import { TeamScoreDto } from '@proxy/matches';

@Component({
  selector: 'app-team-score',
  templateUrl: './team-score.component.html',
  styleUrls: ['./team-score.component.scss'],
})
export class TeamScoreComponent implements OnInit {
  constructor() {}

  @Input() team: TeamScoreDto;

  ngOnInit(): void {}
}
