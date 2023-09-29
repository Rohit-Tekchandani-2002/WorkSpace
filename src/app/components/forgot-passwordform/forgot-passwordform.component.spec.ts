import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordformComponent } from './forgot-passwordform.component';

describe('ForgotPasswordformComponent', () => {
  let component: ForgotPasswordformComponent;
  let fixture: ComponentFixture<ForgotPasswordformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordformComponent]
    });
    fixture = TestBed.createComponent(ForgotPasswordformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
