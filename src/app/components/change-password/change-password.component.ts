import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { OtpService } from '../../service/otp.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private builder: FormBuilder,
              private ref: MatDialogRef<ChangePasswordComponent>,
              private route: ActivatedRoute,
              private service: OtpService,
              private toast: ToastrService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data:any) {
                this.email=data.email;
              }
  changePassword!: FormGroup;
  email: string = '';

  ngOnInit(): void {

    this.changePassword = this.builder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
    
    
  

  close() {
    this.ref.close();
  }

  change(): void {
    if (this.changePassword.valid) {
      const { password, repeatPassword } = this.changePassword.value;

      if (password !== repeatPassword) {
        this.toast.error('Passwords do not match. Please enter the password again!');
        return;
      }

      const passwordData = { email: this.email, password,repeatPassword };

      this.service.changePassword(passwordData).subscribe(
        (res) => {
          this.toast.success(res.message);
          this.router.navigateByUrl('/coverPage');
          this.ref.close();
        },
        (error) => {
          this.toast.error(error.error.message || 'Password change failed');
        }
      );
    } else {
      this.toast.error('Please fill out all required fields correctly.');
    }
  }
}
