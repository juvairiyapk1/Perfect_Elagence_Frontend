import { selectAuthState, selectToken } from './../../state/auth.selectors';
import { Component, OnInit, isDevMode } from '@angular/core';
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




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isMenuVisible = false;
  user!:string|null;
  isLoggedIn!:boolean;
  isAdmin=false;


  constructor(private dialog:MatDialog,
    private store:Store<any>,
    private service:JwtServiceService
  
  ){
    
  }
  ngOnInit(): void {
    this.store.select(selectToken).subscribe(token => {
      if (token) {
        this.isLoggedIn = true;
        if (typeof window !== 'undefined' && window.localStorage) {
          this.user = localStorage.getItem('userName');
        }
        this.service.getRoles().subscribe((roles) => {
          this.isAdmin = roles.includes(Roles.ADMIN);
        });
      } else {
        this.isLoggedIn = false;
        this.isAdmin = false;
      }
    });
  }
  
  

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  

  openLoginPopUp() {
    this.dialog.open(LoginComponent, {
      width: '30%',
      data: {
        title: 'Welcome back!! Please Login'
      }
    }).afterClosed().subscribe(result => {
       
    });
  }

  
}
