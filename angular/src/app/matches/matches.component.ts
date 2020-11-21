import { Component, OnInit } from '@angular/core';
import { MatchService } from '@proxy';
import { MatchScoreDto } from '@proxy/matches';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {
  constructor(private matchService: MatchService) {} //
  teamNames: string[];
  matchScore: MatchScoreDto;
  selectedTeam = 'Select any team';
  ngOnInit(): void {
    this.matchService.getAllTeams().subscribe(response => {
      this.teamNames = response;
    });
  }

  selectTeam(teamName: string): void {
    this.selectedTeam = teamName;
  }

  getScores(): void {
    this.matchService.getMatchScoreByTeamName(this.selectedTeam).subscribe(response => {
      this.matchScore = response;
    });
  }
}
