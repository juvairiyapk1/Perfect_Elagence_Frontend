import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { setToken, clearToken} from './auth.actions';
import { AuthState } from './auth.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private store: Store<{ auth: AuthState }>) {}

  setToken(token: string) {
    this.store.dispatch(setToken({ token }));
  }

  clearToken() {
    this.store.dispatch(clearToken());
  }

  
}
