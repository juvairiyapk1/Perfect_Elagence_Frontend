import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OtpService } from '../../service/otp.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { EditPasswordComponent } from '../edit-password/edit-password.component';

@Component({
  selector: 'app-email-otp-verification',
  templateUrl: './email-otp-verification.component.html',
  styleUrls: ['./email-otp-verification.component.scss']
})
export class EmailOtpVerificationComponent implements OnInit {
  otpForm!: FormGroup;
  email!: string;
  userId!:string|null;

  constructor(private builder: FormBuilder,
              private toast: ToastrService,
              private router: Router,
              private service: OtpService,
              private route: ActivatedRoute,
              private ref: MatDialogRef<EmailOtpVerificationComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data:any) {
                this.email=data.email;
              }

  ngOnInit(): void {
    this.otpForm = this.builder.group({
      otpInput: ['', [Validators.required]]
    });
  }

  verify() {
    if (this.otpForm.valid) {
      const otpValue = this.otpForm.value.otpInput;
      const otpData = { email: this.email, otp: otpValue };
        console.log(otpData.email+"My email");
      this.service.verifyOtp(otpData).subscribe(
        (res) => {
          if (typeof window !== 'undefined' && window.localStorage) {
            this.userId = localStorage.getItem('userId');
           }
          if(this.userId ==null){
          this.toast.success('OTP verified');
          this.openChangePasswordPopUp();}
          else{
            this.toast.success('OTP verified');
            this.openEditPasswordPopUp();
          }
        },
        (error) => {
          this.toast.error('OTP verification failed');
        }
      );
    }
  }

  close() {
    this.ref.close();
  }

  openChangePasswordPopUp() {
    this.dialog.open(ChangePasswordComponent, {
      width: '35%',
      data: { email: this.email }
    });
    this.close()
  }


  openEditPasswordPopUp(){
    this.dialog.open(EditPasswordComponent,{
      width: '40%',
      data:{email:this.email}
    })
    this.close();
  }
}
