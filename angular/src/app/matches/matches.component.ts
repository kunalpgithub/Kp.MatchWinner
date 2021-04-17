import { Component, OnInit } from '@angular/core';
import {
  CurrentTournamentDto,
  TournamentMatchDto,
  TournamentMatchService,
} from '@proxy/match-admin';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {
  currentTournaments: CurrentTournamentDto[];
  tournamentMatches: TournamentMatchDto[];
  teamNames: string[];
  venues: string[];
  selectedTeam = 'Select playing team';
  selectedOpponentTeam = 'Select opponent team';
  selectedVenue = 'Select Venue';

  /**
   *
   */
  constructor(private tournamentMatchService: TournamentMatchService) { }
  ngOnInit(): void {
    this.tournamentMatchService.getRunningTournament().subscribe(response => {
      this.currentTournaments = response;
      this.tournamentMatchService
        .getMatchesByTournamentIdAndSeason(
          this.currentTournaments[0].tournamentId,
          this.currentTournaments[0].season
        )
        .subscribe(response => {
          this.tournamentMatches = response;
        });
    });
  }

  // selectTeam(teamName: string): void {
  //   this.selectedTeam = teamName;
  // }
  // selectOpponentTeam(teamName: string): void {
  //   this.selectedOpponentTeam = teamName;
  // }
  // selectVenue(teamName: string): void {
  //   this.selectedVenue = teamName;
  // }

  selectTournament(tournamentId: string, season: string): void {
    // const tournamentId = '43a5eeaa-f756-9903-7dd3-39fb6151c486'; // e4102db3-45d8-112d-a247-39fad618aea6
  }

  showAnalysis(index: number): void {
    var currentMatch = this.tournamentMatches[index];
  }
}
