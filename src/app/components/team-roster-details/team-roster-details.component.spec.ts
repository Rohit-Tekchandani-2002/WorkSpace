import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRosterDetailsComponent } from './team-roster-details.component';

describe('TeamRosterDetailsComponent', () => {
  let component: TeamRosterDetailsComponent;
  let fixture: ComponentFixture<TeamRosterDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamRosterDetailsComponent]
    });
    fixture = TestBed.createComponent(TeamRosterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
