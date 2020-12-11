import { Component, OnInit } from '@angular/core';
import { MatchService } from '@proxy';

import { ScheduleDto, ScheduleService } from '@proxy/schedules';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {
  teamNames: string[];
  venues: string[];
  schedules: ScheduleDto[];
  selectedTeam = 'Select playing team';
  selectedOpponentTeam = 'Select opponent team';
  selectedVenue = 'Select Venue';

  /**
   *
   */
  constructor(private matchService: MatchService, private scheduleService: ScheduleService) {}
  ngOnInit(): void {
    // this.matchService.getMatchFilters().subscribe(response => {
    //   this.teamNames = response.teams;
    //   this.venues = response.venues;
    // });
    this.scheduleService.getSchedule().subscribe(response => {
      this.schedules = response;
    });
  }

  loadSchedule(): void {}

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
    this.schedules[index].showAnalysis = true;
    this.selectedTeam = this.schedules[index].homeTeam;
    this.selectedOpponentTeam = this.schedules[index].visitorTeam;
  }
}
