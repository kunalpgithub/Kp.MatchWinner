import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBattleComponent } from './player-battle.component';

describe('PlayerBattleComponent', () => {
  let component: PlayerBattleComponent;
  let fixture: ComponentFixture<PlayerBattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerBattleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
