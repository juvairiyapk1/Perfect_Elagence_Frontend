import { selectToken } from './../state/auth.selectors';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { jwtDecode } from 'jwt-decode';
import { decode } from 'node:punycode';
import { Observable, map } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {

  token$:Observable<string|null>;

  constructor(private store:Store<any>) {
    this.token$=this.store.select(selectToken);
     }

   decodeToken(token:string):any{
    try{      
      const decoded= jwtDecode(token);
      return decoded;
    }catch(error){
      console.error('Error decoding token', error);
      return null;
    }
    
   }

   getRoles():Observable<string[]>{
    return this.token$.pipe(
      map(token =>{
        if(token){
          const decodedToken=this.decodeToken(token);
          if(decodedToken && decodedToken.role){
            const isSubscribed=decodedToken.isSubscribed
            if (typeof localStorage !== 'undefined') {
            localStorage.setItem("isSubscribed",isSubscribed)
            }
            return decodedToken.role;
          }
        }
        return [];
      })
    )
   }
}
