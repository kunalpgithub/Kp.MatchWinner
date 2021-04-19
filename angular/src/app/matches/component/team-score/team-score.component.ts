import { Component, Input, OnInit } from '@angular/core';
import { TeamScoreDto } from '@proxy/match-admin';
// import { TeamScoreDto } from '@proxy/matches';

@Component({
  selector: 'app-team-score',
  templateUrl: './team-score.component.html',
  styleUrls: ['./team-score.component.scss'],
})
export class TeamScoreComponent implements OnInit {
  constructor() { }

  @Input() team: TeamScoreDto;
  @Input() teamName: string;
  @Input() teamScore: string;

  ngOnInit(): void {
    this.team.batsmen = this.team.batsmen
      .sort((bat1, bat2) => {
        if (bat1.run > bat2.run) {
          return -1;
        }
        if (bat1.run < bat2.run) {
          return 1;
        }
        return 0;
      })
      .splice(0, 4);
    this.team.bowlers = this.team.bowlers
      .sort((bowl1, bowl2) => {
        if (bowl1.wicket > bowl2.wicket) {
          return -1;
        }
        if (bowl1.wicket < bowl2.wicket) {
          return 1;
        }
        return 0;
      })
      .splice(0, 4);
    if (!this.teamScore) {
      this.teamScore = this.team.score;
    }
  }
}
