import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectItemWorklogComponent } from './update-project-item-worklog.component';

describe('UpdateProjectItemWorklogComponent', () => {
  let component: UpdateProjectItemWorklogComponent;
  let fixture: ComponentFixture<UpdateProjectItemWorklogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProjectItemWorklogComponent]
    });
    fixture = TestBed.createComponent(UpdateProjectItemWorklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
