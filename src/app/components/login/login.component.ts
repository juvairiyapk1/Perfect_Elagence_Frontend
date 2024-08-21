import { Roles } from './../../model/roles.enum';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import * as AuthActions from '../../state/auth.actions';
import { RegisterServiceService } from '../../service/register-service.service';
import { LOGIN } from '../../model/Interface';
import { CustomValidators } from '../../Validators/noSpaceAllowed.validator';
import { AuthService } from '../../state/auth.service';
import { JwtServiceService } from '../../service/jwt-service.service';
import { VerifyEmailComponent } from '../verify-email/verify-email.component';
import { AuthStateService } from '../../service/auth-state.service';
import { ChatService } from '../../service/chat.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
 @Input()inputdata:any;



  constructor(@Inject(MAT_DIALOG_DATA)public data:any,
  private ref:MatDialogRef<LoginComponent>,
  private builder:FormBuilder,
  private service:RegisterServiceService,
  private router:Router,
  private toast:ToastrService,
  private dialog:MatDialog,
  private jwtService:JwtServiceService,
  private authStateService:AuthStateService
  ){}

  userLogin!:FormGroup ;
  
  ngOnInit(): void {
    this.inputdata=this.data;
    this.userLogin=this.builder.group({
      email:this.builder.control('', [ Validators.email]),
      password:this.builder.control('',[Validators.required,Validators.minLength(8),CustomValidators.noSpaceAllowed]),
    })   
     
  } 
  closeLogin(){
    this.ref.close();
  }


  submitForm(): void {
    if (this.userLogin.valid) {
        const userData: LOGIN = {
            email: this.userLogin.value.email,
            password: this.userLogin.value.password
        };
       this.service.login(userData).subscribe(
            (response) => {
                if (response.token != null) {
                    console.log(response.blocked);
                    if (response.blocked) {
                        this.toast.error("Your account has been blocked by the admin");
                        return;
                    }

                    localStorage.clear();
                    sessionStorage.clear();

                    localStorage.setItem('userName', response.name);
                    const jwtToken = response.token;
                    localStorage.setItem('jwtToken', jwtToken);

                    // Set the logged in state and username
                    this.authStateService.setLoggedIn(true);
                    this.authStateService.setUserName(response.name);

                    this.jwtService.getRoles().subscribe((roles) => {
                        const loggedIn = response.logged;
                        const userId = response.id;
                        if (typeof localStorage !== 'undefined') {
                            localStorage.setItem('isLoggedIn', loggedIn);
                            localStorage.setItem('userId', userId);
                        }

                        this.closeLogin();

                        if (roles.includes(Roles.USER)) {
                          
                            this.router.navigateByUrl("/user/home");
                            console.log(jwtToken + " inside login");

                            this.toast.success("Login successful");
                        } else if (roles.includes(Roles.ADMIN)) {
                            this.router.navigateByUrl("/admin/dashboard");
                            this.toast.success("Login successful");
                        }

                        // Set the admin status
                        this.authStateService.setIsAdmin(roles.includes(Roles.ADMIN));
                    });
                }
            },
            (error) => {
                if (error.status === 403) { // Check for the 403 Forbidden status
                    this.toast.error("Your account has been blocked by the admin");
                } else if (error.status === 400) {
                    this.toast.error("Invalid Password or email");
                } else {
                    this.toast.error("An error occurred. Please try again.");
                }
            }
        );
    } else {
        console.error('Form is invalid');
    }
}

    
    

  openEmailVerifyPopUp() {
    this.dialog.open(VerifyEmailComponent, {
      width: '35%',
      data: {
        title: 'Email Verification !!'
      }
    });
    this.closeLogin();
    
  }


  


}
