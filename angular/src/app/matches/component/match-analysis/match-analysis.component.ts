import { Component, Input, OnInit } from '@angular/core';
import { MatchService } from '@proxy';
import { MatchScoreDto, PlayerBattleDto } from '@proxy/matches';

@Component({
  selector: 'app-match-analysis',
  templateUrl: './match-analysis.component.html',
  styleUrls: ['./match-analysis.component.scss'],
})
export class MatchAnalysisComponent implements OnInit {
  constructor(private matchService: MatchService) {}

  matchScores: MatchScoreDto[];
  homeMatchScores: MatchScoreDto[];
  visitorMatchScores: MatchScoreDto[];
  playerBattles: PlayerBattleDto[];
  @Input() homeTeam: string;
  @Input() visitorTeam: string;
  @Input() location: string;

  ngOnInit(): void {
    this.getScores();
  }

  getScores(): void {
    this.matchService
      .getMatchAnalysisByTeamNameAndOpponentTeamAndVenue(
        this.homeTeam,
        this.visitorTeam,
        this.location.split(',')[0]
      )
      .subscribe(response => {
        this.matchScores = response.matchScores;
        this.playerBattles = response.playerBattles;
        this.homeMatchScores = response.homeTeamVenueMatchScores;
        this.visitorMatchScores = response.visitorTeamVenueMatchScores;
      });
    // this.matchService.getMatchScoreByTeamName(this.selectedTeam)
  }
}
