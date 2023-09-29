import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWorkItemComponent } from './new-work-item.component';

describe('NewWorkItemComponent', () => {
  let component: NewWorkItemComponent;
  let fixture: ComponentFixture<NewWorkItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewWorkItemComponent]
    });
    fixture = TestBed.createComponent(NewWorkItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
