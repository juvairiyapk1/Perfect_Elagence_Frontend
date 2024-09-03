import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, take } from 'rxjs';
import { MonthlyUserSubscriptionDTO, PACKAGE, SUBCRIPTION, SUBSCRIBR, USER_ADMIN } from '../model/Interface';
import { Store } from '@ngrx/store';
import { selectToken } from '../state/auth.selectors';
import { env } from '../model/enviornment';




@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  token: string | null;


  constructor(private http: HttpClient,
    private store: Store<any>) {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('jwtToken');
    } else {
      this.token = null;
    }
  }



  getUser(): Observable<USER_ADMIN[]> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<USER_ADMIN[]>(env.serverUrl + '/admin/user-list', { headers });
  }





  blockUser(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(env.serverUrl + `/admin/${id}/block`, {}, { headers });
  }



  unblockUser(id: number): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(env.serverUrl + `/admin/${id}/unblock`, {}, { headers });
  }




  getPackage(): Observable<PACKAGE[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<PACKAGE[]>(env.serverUrl + '/admin/getPackages', { headers });
  }




  add(request: PACKAGE): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<PACKAGE>(env.serverUrl + '/admin/package', request, { headers })
  }




  getSubscriber(): Observable<SUBSCRIBR[]> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<SUBSCRIBR[]>(env.serverUrl + '/admin/subscribers', { headers })
  }



  getUserCounts(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.get(`${env.serverUrl}/admin/count`, { headers });
  }





  getMonthlyUserAndSubscriptionData(): Observable<MonthlyUserSubscriptionDTO> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<MonthlyUserSubscriptionDTO>(`${env.serverUrl}/admin/user-subscription`, { headers });
  }




  getMonthlyRevenue(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${env.serverUrl}/admin/monthly`, { headers });
  }








}
