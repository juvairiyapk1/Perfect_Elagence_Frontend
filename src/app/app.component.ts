import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegisterServiceService } from './service/register-service.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Roles } from './model/roles.enum';
import { JwtServiceService } from './service/jwt-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit,OnDestroy{

  constructor(private jwtService:JwtServiceService,
              private router:Router
  ){}

  isAdmin=false;
  private rolesSubscription!: Subscription;

  title = 'Perfect_Elegance';

  ngOnInit(): void {
    
    this.rolesSubscription=this.jwtService.getRoles().subscribe((roles) => {
    
      this.isAdmin = roles.includes(Roles.ADMIN);
  });
}

ngOnDestroy(): void {
  if (this.rolesSubscription) {
    this.rolesSubscription.unsubscribe();
  }
}

}
