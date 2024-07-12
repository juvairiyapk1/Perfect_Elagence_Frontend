import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectToken } from './state/auth.selectors';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  // No need to directly access the token here. Let the store manage it.

  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${store.select(selectToken)}`
    }
  });

  return next(clonedReq);
};
