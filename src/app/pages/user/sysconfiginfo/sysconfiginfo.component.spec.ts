import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysconfiginfoComponent } from './sysconfiginfo.component';

describe('SysconfiginfoComponent', () => {
  let component: SysconfiginfoComponent;
  let fixture: ComponentFixture<SysconfiginfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SysconfiginfoComponent]
    });
    fixture = TestBed.createComponent(SysconfiginfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
