import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { JwtServiceService } from '../../service/jwt-service.service';
import { selectToken } from '../../state/auth.selectors';
import { Roles } from '../../model/roles.enum';
import { AuthStateService } from '../../service/auth-state.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{

  user!:string|null;
  isLoggedIn!:boolean;
  isUser=false;

  constructor(private store:Store,
    private service:JwtServiceService,
    private authStateService:AuthStateService
  ){

  }


  ngOnInit(): void {



    this.authStateService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });

    this.authStateService.userName$.subscribe(userName => {
      this.user = userName;
    });

    this.authStateService.isAdmin$.subscribe(isAdmin => {
      this.isUser = !isAdmin; // Assuming a user is either admin or regular user
    });

    if(typeof localStorage !== 'undefined'){
       const token =localStorage.getItem('jwtToken')
      if (token) {
        this.isLoggedIn = true;
        if (typeof window !== 'undefined' && window.localStorage) {
          this.user = localStorage.getItem('userName');
        }
        this.service.getRoles().subscribe((roles) => {
          this.isUser = roles.includes(Roles.USER);
        });
      } else {
        this.isLoggedIn = false;
        this.isUser = false;
      }
    }
  
  }

}
