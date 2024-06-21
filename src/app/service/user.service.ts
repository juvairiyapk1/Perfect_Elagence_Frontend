import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import { PROFILE } from '../model/Interface';
import { Store } from '@ngrx/store';
import { selectToken } from '../state/auth.selectors';


const BASE_URL = 'http://localhost:8080/';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  token$:Observable<string|null>;


  constructor(private http:HttpClient,
    private store:Store
  ) { 
    this.token$=store.select(selectToken);
  }

  getAllUsers(): Observable<PROFILE[]> {
    console.log("inside getAll users");
    return this.token$.pipe(
      take(1),
      switchMap(token => {
      
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        
        return this.http.get<PROFILE[]>(`${BASE_URL}user/OtherUsers`, { headers });
      })
    );
  }
  

  
  
}
