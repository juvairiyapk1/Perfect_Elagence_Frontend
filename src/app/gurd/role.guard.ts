import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectToken } from '../state/auth.selectors';
import { JwtServiceService } from '../service/jwt-service.service';
import { Roles } from '../model/roles.enum';

export const roleGuard: CanActivateFn = (route, state) => {

  const store=inject(Store);
  const service=inject(JwtServiceService)

  service.getRoles().subscribe((roles) => {
   if(roles.includes(Roles.ADMIN)) 
   {
    return true;
   }
  
      
    })
  
  return false;
};
