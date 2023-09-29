import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndoDialogComponent } from './undo-dialog.component';

describe('UndoDialogComponent', () => {
  let component: UndoDialogComponent;
  let fixture: ComponentFixture<UndoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UndoDialogComponent]
    });
    fixture = TestBed.createComponent(UndoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
