import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, switchMap, take, throwError } from 'rxjs';
import { selectToken } from '../state/auth.selectors';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { PROFILE_PROFILE, USER_PROFILE } from '../model/Interface';

const BASE_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  token$:Observable<string|null>
  userId!:string|null;

  constructor(private store:Store,
    private http:HttpClient
  ) { 
    this.token$=store.select(selectToken);
  }

  getUser(): Observable<USER_PROFILE> {
    console.log("inside getAll users");
    return this.token$.pipe(
      take(1),
      switchMap(token => {
      
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        console.log(headers);
        if(typeof window !== 'undefined' && window.localStorage){
          this.userId=localStorage.getItem('userId');
        }

        if (!this.userId) {
          throw new Error("User ID is not available");
        }

        
        return this.http.get<USER_PROFILE>(`${BASE_URL}/user/profile/${this.userId}`, { headers });
      })
    );
  }


  uploadImage(userId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('multipartFile', file);
    formData.append('userId', userId.toString());
    console.log(file + " file");
    console.log(userId + " user");

    return this.token$.pipe(
      take(1),
      switchMap(token => {
        if (!token) {
          return throwError('Token is not available');
        }

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        return this.http.post<any>(`${BASE_URL}/user/upload`, formData, {
          headers: headers,
          reportProgress: true,
          observe: 'events'
        });
      }),
      map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total!);
            return { status: 'progress', message: progress };
          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error.message || 'Server Error');
      })
    );
  }


  getProfile(): Observable<PROFILE_PROFILE> {
    console.log("inside getAll users");
    return this.token$.pipe(
      take(1),
      switchMap(token => {
      
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        console.log(headers);
        if(typeof window !== 'undefined' && window.localStorage){
          this.userId=localStorage.getItem('userId');
        }

        if (!this.userId) {
          throw new Error("User ID is not available");
        }

        
        return this.http.get<USER_PROFILE>(`${BASE_URL}/user/getProfile/${this.userId}`, { headers });
      })
    );
  }

}
