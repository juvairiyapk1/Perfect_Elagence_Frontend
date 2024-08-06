import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap, take, throwError } from 'rxjs';
import { PACKAGE, Payment_Response } from '../model/Interface';
import { Store } from '@ngrx/store';
import { selectToken } from '../state/auth.selectors';
import { env } from 'node:process';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
//   token$:Observable<String|null>
token:string|null;

  private BASE_URL ='http://localhost:8080'
  userId!:string|null;


  constructor(private http:HttpClient,
              private store:Store  ,
              private toast:ToastrService
              ) { 
                // this.token$ = store.select(selectToken)

                if(typeof localStorage !== 'undefined'){
                    this.token = localStorage.getItem('jwtToken');
                }else{
                    this.token = null;
                }
              }

              // createSessionPayment(pkg: any): Observable<any> {
              //   if (typeof window !== 'undefined' && window.localStorage) {
              //     this.userId = localStorage.getItem('userId');
              //   }
            
              //   const sessionDto = {
              //     userId: this.userId,
              //     packageId: pkg.id,
              //     amount: pkg.price,
              //     currency: 'INR',
              //     productName: pkg.packageName,
              //   };
            
              //   return this.token$.pipe(
              //     take(1),
              //     switchMap((token) => {
              //       if (token) {
              //         const headers = new HttpHeaders({
              //           Authorization: `Bearer ${token}`,
              //         });
            
              //         return this.http.post(`${this.BASE_URL}/user/session/payment`, sessionDto, { headers });
              //       } else {
              //         return throwError('No token found');
              //       }
              //     })
              //   );
              // }


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


            // checkout(priceId: string): Observable<string> {
            //     if (!this.token) {
            //         return throwError('No token found in localStorage.');
            //     }
            //     const headers = new HttpHeaders({
            //         'Authorization': `Bearer ${this.token}`
            //     });
            //     return this.http.post<{ url: string }>(
            //         `${this.BASE_URL}/user/create-checkout-session`,
            //         { priceId },
            //         { headers }
            //     ).pipe(
            //         catchError(error => {
            //             if (error.status === 400) {
            //                 // User is already subscribed
            //                 console.error('User is already subscribed.');
            //                 this.toast.error("User Subscribed");
            //                 // Optionally, emit an observable with a specific value or error
            //                 return throwError('User is already subscribed.');
            //             }
            //             return throwError(error);
            //         }),
            //         map(response => response.url)
            //     );
            // }
                       
}
