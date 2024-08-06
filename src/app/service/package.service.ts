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

  token: string | null;


  constructor(private http: HttpClient,
    private store: Store<any>) {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('jwtToken');
    } else {
      this.token = null;
    }
  }




  getPackage(): Observable<PACKAGE[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<PACKAGE[]>(BASE_URL + 'user/getPackages', { headers })

  }


}
