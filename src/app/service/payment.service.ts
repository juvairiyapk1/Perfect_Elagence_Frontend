import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable,  throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { env } from '../model/enviornment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
token:string|null;

  private BASE_URL =env.serverUrl;
  userId!:string|null;


  constructor(private http:HttpClient,
              private store:Store  ,
              private toast:ToastrService
              ) { 
                

                if(typeof localStorage !== 'undefined'){
                    this.token = localStorage.getItem('jwtToken');
                }else{
                    this.token = null;
                }
              }

              


              checkout(priceId: string): Observable<string> {
                const headers = new HttpHeaders({
                  'Authorization': `Bearer ${this.token}`
                });
            
                return this.http.post<{ url: string }>(
                  `${this.BASE_URL}/user/create-checkout-session`,
                  { priceId },
                  { headers }
                ).pipe(
                  catchError(error => {
                    if (error.status === 400) {
                      // User is already subscribed
                      console.error('User is already subscribed.');
                      this.toast.error("User already subscribed");
                      return throwError('User is already subscribed.');
                    }
                    return throwError(error);
                  }),
                  map(response => response.url)
                );
              }


                       
}
