import { UserSideNavComponent } from './../userComponents/user-side-nav/user-side-nav.component';
import { PROFILEBYUSER } from './../model/Interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import { PROFILE } from '../model/Interface';
import { Store } from '@ngrx/store';
import { selectToken } from '../state/auth.selectors';
import { env } from '../model/enviornment';


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

  getAllUsers(pageNo: number, pageSize: number,profession:string): Observable<PROFILE[]> {
    console.log("inside getAll users");
    return this.token$.pipe(
      take(1),
      switchMap(token => {
      
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        let params = new HttpParams()
          .set('pageNo', pageNo.toString())
          .set('pageSize', pageSize.toString());
        
        if (profession) {
          params = params.set('profession', profession);
        }
        
        return this.http.get<PROFILE[]>(`${BASE_URL}user/OtherUsersByProfession`, {headers, params});
      })
    );
  }
  

  professions:string[]=[
    "Student",
    "Bussiness",
    "Agriculture",
    "Government",
    "Teacher",
    "Doctor" ,
  ];

  getProfession(){
    return this.professions;
  }

  getUserById(userId: number): Observable<PROFILEBYUSER> {
    return this.token$.pipe(
      take(1),
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        const params = new HttpParams().set('userId', userId.toString());
        return this.http.get<PROFILEBYUSER>(`${BASE_URL}user/profileByUser`,{ headers,params});
      })
    );
  }
  
}
