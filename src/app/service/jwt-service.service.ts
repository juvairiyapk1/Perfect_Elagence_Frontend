import { selectToken } from './../state/auth.selectors';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { jwtDecode } from 'jwt-decode';
import { Observable, map } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {

  token: string | null;

  constructor(private store: Store<any>) {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('jwtToken');
    } else {
      this.token = null;
    }
  }

  decodeToken(token: string): any {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }

  }




  getRoles(): Observable<string[]> {
    return new Observable<string[]>(observer => {
      if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const decodedToken = this.decodeToken(token);
          if (decodedToken && decodedToken.role) {
            const isSubscribed = decodedToken.isSubscribed;
            localStorage.setItem("isSubscribed", isSubscribed.toString());
            observer.next(decodedToken.role);
          } else {
            observer.next([]);
          }
        } else {
          observer.next([]);
        }
      } else {
        console.warn('localStorage is not available');
        observer.next([]);
      }
      observer.complete();
    });
  }
}
