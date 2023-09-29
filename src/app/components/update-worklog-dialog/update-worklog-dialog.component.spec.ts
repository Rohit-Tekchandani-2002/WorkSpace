import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWorklogDialogComponent } from './update-worklog-dialog.component';

describe('UpdateWorklogDialogComponent', () => {
  let component: UpdateWorklogDialogComponent;
  let fixture: ComponentFixture<UpdateWorklogDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateWorklogDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateWorklogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
