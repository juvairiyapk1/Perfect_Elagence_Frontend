import { clearToken } from './auth.actions';
import { createSelector,createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';



export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);

