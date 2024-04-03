import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '@state/auth.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore: AuthStore = inject(AuthStore);

  const accessToken: string = authStore.accessToken();

  req = req.clone({
    setHeaders: {
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  });
  return next(req).pipe();
};
