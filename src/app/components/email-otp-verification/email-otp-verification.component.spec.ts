import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailOtpVerificationComponent } from './email-otp-verification.component';

describe('EmailOtpVerificationComponent', () => {
  let component: EmailOtpVerificationComponent;
  let fixture: ComponentFixture<EmailOtpVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailOtpVerificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailOtpVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
