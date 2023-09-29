import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttachmentsComponent } from './add-attachments.component';

describe('AddAttachmentsComponent', () => {
  let component: AddAttachmentsComponent;
  let fixture: ComponentFixture<AddAttachmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAttachmentsComponent]
    });
    fixture = TestBed.createComponent(AddAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
