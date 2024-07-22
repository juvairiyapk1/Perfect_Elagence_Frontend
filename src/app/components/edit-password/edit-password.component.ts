import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OtpService } from '../../service/otp.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.scss'
})
export class EditPasswordComponent implements OnInit {

  constructor(private builder: FormBuilder,
    private ref: MatDialogRef<EditPasswordComponent>,
    private service: OtpService,
    private toast: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.email = data.email;
  }

  editPassword!: FormGroup;
  email: string = '';

  ngOnInit(): void {
    this.editPassword = this.builder.group({
      currentPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8)]]

    })
  }

  edit() {
    if (this.editPassword.valid) {
      const { currentPassword, newPassword, repeatPassword } = this.editPassword.value;


      if (newPassword !== repeatPassword) {
        this.toast.error('Passwords do not match. Please enter the password again!');
        return;
      }

      const passwordData = { email: this.email, currentPassword, newPassword, repeatPassword };

      this.service.editPassword(passwordData).subscribe(res => {
        this.toast.success(res.message)
        this.close();
      },
        error => {
          this.toast.error('Change new password,it is current password')
        }
      )

    }

  }

  close() {
    this.ref.close()


  }


}
