import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWorkItemComponent } from './project-work-item.component';

describe('ProjectWorkItemComponent', () => {
  let component: ProjectWorkItemComponent;
  let fixture: ComponentFixture<ProjectWorkItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectWorkItemComponent]
    });
    fixture = TestBed.createComponent(ProjectWorkItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
