import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWorkGroupLogsTableComponent } from './project-work-group-logs-table.component';

describe('ProjectWorkGroupLogsTableComponent', () => {
  let component: ProjectWorkGroupLogsTableComponent;
  let fixture: ComponentFixture<ProjectWorkGroupLogsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectWorkGroupLogsTableComponent]
    });
    fixture = TestBed.createComponent(ProjectWorkGroupLogsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
