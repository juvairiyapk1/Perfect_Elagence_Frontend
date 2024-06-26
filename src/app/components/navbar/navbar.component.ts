import { selectAuthState, selectToken } from './../../state/auth.selectors';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { AuthService } from '../../state/auth.service';
import { RegisterServiceService } from '../../service/register-service.service';

import { ProfileService } from '../../service/profile.service';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isMenuVisible = false;
  user!:string|null;
  isLoggedIn!:boolean;


  constructor(private dialog:MatDialog,
    private store:Store<any>,
    private router:Router,
    private service:AuthService,
    private registerService:RegisterServiceService,
    private profileService:ProfileService
  
  ){
    
  }
  ngOnInit(): void {
    
   this.store.select(selectToken).subscribe(token=>{
    if(token){
       this.isLoggedIn = true;
       if(typeof window !== 'undefined' && window.localStorage){
        this.user=localStorage.getItem('userName')
       }
    }else{
      this.isLoggedIn= false;
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
