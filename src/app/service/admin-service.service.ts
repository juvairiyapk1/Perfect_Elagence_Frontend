import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, take } from 'rxjs';
import { USER_ADMIN } from '../model/Interface';
import { Store } from '@ngrx/store';
import { selectToken } from '../state/auth.selectors';

const BASE_URL = ['http://localhost:8080/'];



@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  token$:Observable<string|null>;


  constructor(private http:HttpClient,
              private store: Store<any>) {
                this.token$=store.select(selectToken);
               }

               getUser(): Observable<USER_ADMIN[]> {
                return this.token$.pipe(
                  take(1),
                  switchMap(token => {
                    const headers = new HttpHeaders({
                      'Authorization': `Bearer ${token}`
                    });
                    return this.http.get<USER_ADMIN[]>(BASE_URL + 'admin/user-list', { headers });
                  })
                );
              }

  

  blockUser(id: number): Observable<any> {
    return this.token$.pipe(
      take(1),
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        return this.http.post(BASE_URL + `admin/${id}/block`, {}, { headers });
      })
    );
  }

  unblockUser(id: number): Observable<any> {
    return this.token$.pipe(
      take(1),
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        return this.http.post(BASE_URL + `admin/${id}/unblock`, {}, { headers });
      })
    );
  }
  

}
