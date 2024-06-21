import { Roles } from './../../model/roles.enum';
import { Component, Inject, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  inputdata!:any;



  constructor(@Inject(MAT_DIALOG_DATA)public data:any,
  private ref:MatDialogRef<LoginComponent>,
  private builder:FormBuilder,
  private service:RegisterServiceService,
  private router:Router,
  private store:Store<any>,
  private toast:ToastrService,
  private dialog:MatDialog,
  private jwtService:JwtServiceService,
  

  ){}

  userLogin!:FormGroup 
  
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


  submitForm() {
    if (this.userLogin.valid) {
      const userData: LOGIN = {
        email: this.userLogin.value.email,
        password: this.userLogin.value.password
      };
      this.service.login(userData).subscribe(
        (response) => {
          if (response.token != null) {
            const jwtToken = response.token;
            this.store.dispatch(AuthActions.setToken({ token: jwtToken}));
             
            this.jwtService.getRoles().subscribe((roles) => {
              
              
                
              const loggedIn = response.logged;
              if (typeof localStorage !== 'undefined') {
                localStorage.setItem('isLoggedIn', loggedIn);
              }

             
              this.closeLogin();

              if (roles.includes(Roles.USER)) { 
                this.router.navigateByUrl("/user/home");
                this.toast.success("Login successful");

              } else if (roles.includes(Roles.ADMIN)) { 
                this.router.navigateByUrl("/admin/dashboard");
                this.toast.success("Login successful");

            
              }
            });
          }
        },
        (error) => {
          this.toast.error("Invalid Password or email");
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
