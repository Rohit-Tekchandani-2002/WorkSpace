import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewserviceRequestComponent } from './newservice-request.component';

describe('NewserviceRequestComponent', () => {
  let component: NewserviceRequestComponent;
  let fixture: ComponentFixture<NewserviceRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewserviceRequestComponent]
    });
    fixture = TestBed.createComponent(NewserviceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
