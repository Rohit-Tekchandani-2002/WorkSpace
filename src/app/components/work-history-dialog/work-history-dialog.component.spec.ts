import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkHistoryDialogComponent } from './work-history-dialog.component';

describe('WorkHistoryDialogComponent', () => {
  let component: WorkHistoryDialogComponent;
  let fixture: ComponentFixture<WorkHistoryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkHistoryDialogComponent]
    });
    fixture = TestBed.createComponent(WorkHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
