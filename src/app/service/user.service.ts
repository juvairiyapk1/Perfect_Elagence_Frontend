import { UserSideNavComponent } from './../userComponents/user-side-nav/user-side-nav.component';
import { MatchResponse, PROFILEBYUSER } from './../model/Interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import { PROFILE } from '../model/Interface';
import { Store } from '@ngrx/store';
import { selectToken } from '../state/auth.selectors';
import { env } from '../model/enviornment';
import { ToastrService } from 'ngx-toastr';


const BASE_URL = 'http://localhost:8080/';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  token$:Observable<string|null>;
  userId!:string|null;



  constructor(private http:HttpClient,
              private store:Store,
             ) { 
             this.token$=store.select(selectToken);
             this.userId = localStorage.getItem('userId');
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

  findMatchCount(): Observable<any> {
    return this.token$.pipe(
      take(1),
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        if (typeof window !== 'undefined' && window.localStorage) {
         this.userId = localStorage.getItem('userId');
        }
        const urlWithParams = `${BASE_URL}user/findMatch?userId=${this.userId}`;
        return this.http.get<any>(urlWithParams,{ headers });
      })
    );
  }


  
  updateProfileVisibility(isProfileHidden: boolean): Observable<any> {
    const endpoint = BASE_URL + 'user/toggleProfileVisibility';
    const requestBody = { userId: this.userId, hidden: isProfileHidden };

    return this.store.select(selectToken).pipe(
      take(1),
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        return this.http.post(endpoint, requestBody, { headers: headers });
      })
    );
  }

  getProfileVisibility(): Observable<boolean> {
    const userId = localStorage.getItem('userId');
    return this.store.select(selectToken).pipe(
      take(1),
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        return this.http.get<boolean>(`${BASE_URL}user/profileVisibility/${userId}`, { headers });
      })
    );
  }


  
}
