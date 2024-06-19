
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map, of, switchMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../../state/auth.reducer';
import { clearToken } from '../../state/auth.actions';
import { OtpService } from '../../service/otp.service';





const BASE_URL = ['http://localhost:8080/'];
@Component({
  selector: 'app-otp-verification',
  templateUrl:'./otp-verification.component.html',
  styleUrl: './otp-verification.component.scss'
})
export class OtpVerificationComponent implements OnInit{
  
  otpForm!: FormGroup;
  email!: string;
  expirationTime!: Date;
  remainingTime!: string;

  constructor(private http:HttpClient,
             private builder:FormBuilder,
              private toast:ToastrService,
              private router:Router,
              private service:OtpService,
              private route:ActivatedRoute
            ){}
            

  ngOnInit(): void {
    this.otpForm = this.builder.group({
      otpInput: ['', [Validators.required]]
    });
      this.route.queryParams.subscribe(params => {
        this.email = params['email'];
        console.log(this.email)
      });

      const storedExpirationTime = localStorage.getItem('expirationTime');
    // if (storedExpirationTime) {
    //   this.expirationTime = new Date(storedExpirationTime);
    //   this.startCountdown();
    // }
  }
  verify() {
    if (this.otpForm.valid) {
        const otpValue = this.otpForm.value.otpInput;
        const otpData = {
            email: this.email,
            otp: otpValue
        };
        console.log(otpData.otp + " otp");
        console.log(otpData.email);

        this.service.verifyOtp(otpData).subscribe(
            (res) => {
                
                this.router.navigateByUrl('/coverPage');
                this.toast.success('Otp verified');
            },
            (error) => {
                console.error('Error:', error);
                this.toast.error("OTP verification failed");
            }
        );
    }
}
 

  
}
