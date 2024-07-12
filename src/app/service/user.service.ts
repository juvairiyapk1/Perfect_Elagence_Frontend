import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  
}
