import { Component, OnInit } from '@angular/core';
import { TournamentMatchDto, TournamentMatchService } from '@proxy/match-admin';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {
  tournamentMatches: TournamentMatchDto[];
  teamNames: string[];
  venues: string[];
  selectedTeam = 'Select playing team';
  selectedOpponentTeam = 'Select opponent team';
  selectedVenue = 'Select Venue';

  /**
   *
   */
  constructor(private tournamentMatchService: TournamentMatchService) {}
  ngOnInit(): void {
    const tournamentId = '43a5eeaa-f756-9903-7dd3-39fb6151c486'; // e4102db3-45d8-112d-a247-39fad618aea6
    this.tournamentMatchService
      .getMatchesByTournamentIdAndSeason(tournamentId, '2021')
      .subscribe(response => {
        this.tournamentMatches = response;
      });
  }

  selectTeam(teamName: string): void {
    this.selectedTeam = teamName;
  }
  selectOpponentTeam(teamName: string): void {
    this.selectedOpponentTeam = teamName;
  }
  selectVenue(teamName: string): void {
    this.selectedVenue = teamName;
  }

  showAnalysis(index: number): void {
    var currentMatch = this.tournamentMatches[index];
  }
}
