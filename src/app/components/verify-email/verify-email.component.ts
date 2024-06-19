import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OtpService } from '../../service/otp.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmailOtpVerificationComponent } from '../email-otp-verification/email-otp-verification.component';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit{

  verifyEmail!: FormGroup;

  constructor(private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: OtpService,
    private ref: MatDialogRef<VerifyEmailComponent>,
    private router: Router,
    private toast: ToastrService,
    private dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.verifyEmail = this.builder.group({
      email: ['', [Validators.required, Validators.email]], 
    });
  }

  submitForm() {
    if (this.verifyEmail.valid) {
      const emailData = { email: this.verifyEmail.value.email };

      this.service.verifyEmail(emailData).subscribe(
        (res) => {
          this.toast.success('OTP sent to email');
          console.log(emailData.email+"kkkkkkkkkkkkkkkkkk")
          this.openOtpVerifyPopUp(emailData.email);
        },
        (error) => {
          this.toast.error('Failed to send OTP');
        }
      );
    }  
  }

  close() {
    this.ref.close();
  }

  openOtpVerifyPopUp(email: string): void {
    const dialogRef = this.dialog.open(EmailOtpVerificationComponent, {
      width: '35%',
      data: { email }
     });
      this.close()
    
  }
}
