import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PROFILE } from '../model/Interface';


const BASE_URL = ['http://localhost:8080/'];


@Injectable({
  providedIn: 'root'
})

export class UserService {


  constructor(private http:HttpClient) { }

  getAllUsers():Observable<PROFILE[]>{
   return this.http.get<PROFILE[]>('user/OtherUsers',{})
  }
}
