import { Component, OnInit } from '@angular/core';
// import { MatchService } from '@proxy';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {
  constructor() {} // private matchService: MatchService
  teamNames: string[];

  ngOnInit(): void {
    // this.matchService.getAllTeams().subscribe(response => {
    //   this.teamNames = response;
    // });
  }
}
