import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let newRequest ;
  if(localStorage.getItem('access_token')) {
    newRequest = req.clone({
       headers:new HttpHeaders({
        Authroization : 'ACCESS_TOKEN_FROM_INTER.'
       })
    })
  } else {
    newRequest = req
  }
  return next(newRequest);
};
