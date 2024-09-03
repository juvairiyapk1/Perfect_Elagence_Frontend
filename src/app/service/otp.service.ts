import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../model/enviornment';


@Injectable({
  providedIn: 'root'
})


export class OtpService {

  constructor(private http:HttpClient) { }

  verifyEmail(requst:any):Observable<any> {
    return this.http.post(env.serverUrl+'/otp/verifyEmail',requst)
   }

   verifyOtp(request: { email: string; otp: number }): Observable<any> {
    console.log(request)
    return this.http.post(env.serverUrl + '/otp/verify_otp', request);
}


  changePassword(request:{email:string; password:string;repeatPassword:string}):Observable<any>{
    return this.http.post(env.serverUrl+'/otp/changePassword',request)
  }

   editPassword(request:{email:string;currentPassword:string,newPassword:string,repeatPassword:string}):Observable<any>{
    return this.http.post(env.serverUrl+'/otp/editPassword',request);
  }

  
}
