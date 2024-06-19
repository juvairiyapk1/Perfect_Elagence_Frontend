import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectToken } from '../state/auth.selectors';

export const authGuard: CanActivateFn = (route, state) => {

const store=inject(Store);
return store.select(selectToken).pipe(
  map(token =>{
    if(token){
      return true;
    }else{
      return false;
    }
  })
);
  
};
