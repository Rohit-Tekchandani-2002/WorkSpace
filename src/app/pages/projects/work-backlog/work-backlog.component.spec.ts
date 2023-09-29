import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkBacklogComponent } from './work-backlog.component';

describe('WorkBacklogComponent', () => {
  let component: WorkBacklogComponent;
  let fixture: ComponentFixture<WorkBacklogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkBacklogComponent]
    });
    fixture = TestBed.createComponent(WorkBacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
