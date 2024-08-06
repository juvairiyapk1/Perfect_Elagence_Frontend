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

  // token$:Observable<string|null>;
  userId:string|null;
  token:string|null;



  constructor(private http:HttpClient,
              private store:Store,
             ) { 
            //  this.token$=store.select(selectToken);
            if(typeof localStorage !== 'undefined'){
              this.token =localStorage.getItem('jwtToken');
              
              this.userId = localStorage.getItem('userId');
            }else{
              this.token = null;
              this.userId = null;
            }
             
             }

  

  getAllUsers(pageNo: number, pageSize: number, profession: string): Observable<PROFILE[]> {
    
    // Create headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  
    // Create params
    let params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString());
  
    if (profession) {
      params = params.set('profession', profession);
    }
  
    // Make the HTTP request
    return this.http.get<PROFILE[]>(`${BASE_URL}user/OtherUsersByProfession`, { headers, params });
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

  

  getUserById(userId: number): Observable<PROFILEBYUSER>{

    const token = localStorage.getItem('jwtToken');


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get<PROFILEBYUSER>(`${BASE_URL}user/profileByUser`,{ headers,params});

  }



  
  findMatchCount(): Observable<any> {


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    const urlWithParams = `${BASE_URL}user/findMatch?userId=${this.userId}`;
     return this.http.get<any>(urlWithParams,{ headers });
  }



  
  

  updateProfileVisibility(isProfileHidden: boolean): Observable<any>{



    const endpoint = BASE_URL + 'user/toggleProfileVisibility';
    const requestBody = { userId: this.userId, hidden: isProfileHidden };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.post(endpoint, requestBody, { headers: headers });

  }



  

  getProfileVisibility(): Observable<boolean>{


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<boolean>(`${BASE_URL}user/profileVisibility/${this.userId}`, { headers });


  }


  

  // isUserIsSubscribed(){
  //   if(this.token != null){

  //   }
  // }

}
