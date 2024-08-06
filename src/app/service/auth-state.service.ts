import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private isAdmin = new BehaviorSubject<boolean>(false);
  private userName = new BehaviorSubject<string | null>(null);

  isLoggedIn$ = this.isLoggedIn.asObservable();
  isAdmin$ = this.isAdmin.asObservable();
  userName$ = this.userName.asObservable();

  setLoggedIn(value: boolean) {
    this.isLoggedIn.next(value);
  }

  setIsAdmin(value: boolean) {
    this.isAdmin.next(value);
  }

  setUserName(value: string | null) {
    this.userName.next(value);
  }

  resetUserState():void{
    this.isLoggedIn.next(false);
    this.isAdmin.next(false);
    this.userName.next('')
  }

}
