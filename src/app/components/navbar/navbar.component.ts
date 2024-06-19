import { selectAuthState } from './../../state/auth.selectors';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { clearToken } from '../../state/auth.actions';
import { AuthService } from '../../state/auth.service';
import { RegisterServiceService } from '../../service/register-service.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  isLoggedIn: any = 'false';
  isMenuVisible = false;
  

  constructor(private dialog:MatDialog,
    private store:Store<any>,
    private router:Router,
    private service:AuthService,
    private registerService:RegisterServiceService
  ){

  }
  ngOnInit(): void {
    
    if (typeof localStorage !== 'undefined') {
      const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
      if (storedIsLoggedIn === 'true') {
        this.isLoggedIn = 'true';
      } else {
        this.isLoggedIn = 'false';
      }
    }
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
      
      this.checkLoginStatus();
    });
  }



logout(): void {
  this.registerService.logout().subscribe(() => {
    this.store.dispatch(clearToken());
    this.isLoggedIn = 'false';
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigateByUrl('coverPage');
  }, error => {
    console.error('Error logging out', error);
  });
}

private checkLoginStatus() {
  if (typeof localStorage !== 'undefined') {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = storedIsLoggedIn === 'true' ? 'true' : 'false';
  }
}
}
