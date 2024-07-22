import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root'
})


export class OtpService {

  constructor(private http:HttpClient) { }

  verifyEmail(requst:any):Observable<any> {
    return this.http.post(BASE_URL+'otp/verifyEmail',requst)
   }

   verifyOtp(request: { email: string; otp: number }): Observable<any> {
    console.log(request)
    return this.http.post(BASE_URL + 'otp/verify_otp', request);
}


  changePassword(request:{email:string; password:string;repeatPassword:string}):Observable<any>{
    return this.http.post(BASE_URL+'otp/changePassword',request)
  }

   editPassword(request:{email:string;currentPassword:string,newPassword:string,repeatPassword:string}):Observable<any>{
    return this.http.post(BASE_URL+'otp/editPassword',request);
  }

  
}
