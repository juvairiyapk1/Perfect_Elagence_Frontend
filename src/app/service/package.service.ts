import { Injectable } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import { PACKAGE } from '../model/Interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectToken } from '../state/auth.selectors';

const BASE_URL = ['http://localhost:8080/'];


@Injectable({
  providedIn: 'root'
})
export class PackageService {

  token$:Observable<string|null>;

   constructor(private http:HttpClient,
              private store: Store<any>) {
                this.token$=store.select(selectToken);
               }
  getPackage():Observable<PACKAGE[]>{
    return this.token$.pipe(
      take(1),
      switchMap((token) =>{
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`

        });
        return this.http.get<PACKAGE[]>(BASE_URL+'user/getPackages',{headers})
      })
    );

  }
}
