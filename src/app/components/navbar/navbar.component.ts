import { selectAuthState, selectToken } from './../../state/auth.selectors';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { clearToken } from '../../state/auth.actions';
import { AuthService } from '../../state/auth.service';
import { RegisterServiceService } from '../../service/register-service.service';
import { USER } from '../../model/Interface';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isMenuVisible = false;
  user!:USER
  isLoggedIn!:boolean;


  constructor(private dialog:MatDialog,
    private store:Store<any>,
    private router:Router,
    private service:AuthService,
    private registerService:RegisterServiceService,
  
  ){
    

  }
  ngOnInit(): void {
    
   this.store.select(selectToken).subscribe(token=>{
    if(token){
       this.isLoggedIn = true;
    }else{
      this.isLoggedIn= false;
    }
   })
      
        
     

    console.log(this.isLoggedIn+"hell")
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
