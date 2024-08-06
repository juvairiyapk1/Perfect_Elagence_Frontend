import { selectAuthState, selectToken } from './../../state/auth.selectors';
import { Component, HostListener, OnInit, isDevMode } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { AuthService } from '../../state/auth.service';
import { RegisterServiceService } from '../../service/register-service.service';

import { ProfileService } from '../../service/profile.service';
import { JwtDecodeOptions } from 'jwt-decode';
import { JwtServiceService } from '../../service/jwt-service.service';
import { Roles } from '../../model/roles.enum';
import { AuthStateService } from '../../service/auth-state.service';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isMenuVisible = false;
  user!:string|null;
  isLoggedIn:boolean=false;
  isAdmin=false;
  token :string|null;


  constructor(private dialog:MatDialog,
    private service:JwtServiceService,
    private authStateService:AuthStateService
  
  ){
    if(typeof localStorage !== 'undefined'){
    this.token=localStorage.getItem('jwtToken');
    }else{
      this.token=null;
    }
  }
  ngOnInit(): void {


    this.authStateService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
    this.authStateService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
    this.authStateService.userName$.subscribe(userName => {
      this.user = userName;
    });

    if(typeof localStorage !== 'undefined'){
       const token = localStorage.getItem('jwtToken')
    
      if (token) {
        this.isLoggedIn = true;
        if (typeof localStorage !== 'undefined') {
          this.user = localStorage.getItem('userName');

        }
        this.service.getRoles().subscribe((roles) => {
          this.isAdmin = roles.includes(Roles.ADMIN);
        });
      } else {
        this.isLoggedIn = false;
        this.isAdmin = false;
      }
    }
    
  }
  
  // ngOnInit(): void {
  //   if(this.token){
  //     this.isLoggedIn=localStorage.getItem('isLoggedIn')=== 'true';

  //     this.user = localStorage.getItem('userName');
      
  //     this.service.getRoles().subscribe((roles)=>{
  //       this.isAdmin =roles.includes(Roles.ADMIN)
  //       console.log(this.isAdmin);
  //     });

  //   }else{
  //     this.isLoggedIn=false;
  //     this.isAdmin=false;
  //   }

  // }
  

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 768) {
      this.isMenuVisible = true;
    } else {
      this.isMenuVisible = false;
    }
  }
  

  openLoginPopUp() {
    this.dialog.open(LoginComponent, {
      width: '50%',
      data: {
        title: 'Welcome back!! Please Login'
      }
    }).afterClosed().subscribe(result => {
       
    });
  }

  
}
