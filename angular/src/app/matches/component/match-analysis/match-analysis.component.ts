import { Component, Input, OnInit } from '@angular/core';
import { TournamentMatchDto } from '@proxy/match-admin';
import { MatchAnalysisService } from '@proxy/match-analysis';

// import { MatchService } from '@proxy';
// import { MatchScoreDto, PlayerBattleDto } from '@proxy/matches';

@Component({
  selector: 'app-match-analysis',
  templateUrl: './match-analysis.component.html',
  styleUrls: ['./match-analysis.component.scss'],
})
export class MatchAnalysisComponent implements OnInit {
  constructor(private _matchAnalysisService: MatchAnalysisService) {}

  matchScores: TournamentMatchDto[];
  homeMatchScores: TournamentMatchDto[];
  visitorMatchScores: TournamentMatchDto[];
  homeTeamAtVenue: TournamentMatchDto[];
  visitorTeamAtVenue: TournamentMatchDto[];
  // playerBattles: PlayerBattleDto[];
  @Input() homeTeam: string;
  @Input() visitorTeam: string;
  @Input() location: string;

  ngOnInit(): void {
    this.getScores();
  }

  getScores(): void {
    this._matchAnalysisService
      .getMatchAnalysisByHomeTeamAndVisitorTeamAndVenue(
        this.homeTeam,
        this.visitorTeam,
        this.location
      )
      .subscribe(response => {
        this.matchScores = response.matchBetweenTeam;
        this.homeMatchScores = response.matchByTeam;
        this.visitorMatchScores = response.matchAgainstTeam;
        this.homeTeamAtVenue = response.homeTeamAtVenue;
        this.visitorTeamAtVenue = response.visitorTeamAtVenue;
      });
    // this.matchService
    //   .getMatchAnalysisByTeamNameAndOpponentTeamAndVenue(
    //     this.homeTeam,
    //     this.visitorTeam,
    //     this.location.split(',')[0]
    //   )
    //   .subscribe(response => {
    //     this.matchScores = response.matchScores;
    //     this.playerBattles = response.playerBattles;
    //     this.homeMatchScores = response.homeTeamVenueMatchScores;
    //     this.visitorMatchScores = response.visitorTeamVenueMatchScores;
    //   });
    // this.matchService.getMatchScoreByTeamName(this.selectedTeam)
  }
}
