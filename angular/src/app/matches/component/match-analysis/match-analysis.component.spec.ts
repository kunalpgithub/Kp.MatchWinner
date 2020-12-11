import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchAnalysisComponent } from './match-analysis.component';

describe('MatchAnalysisComponent', () => {
  let component: MatchAnalysisComponent;
  let fixture: ComponentFixture<MatchAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
