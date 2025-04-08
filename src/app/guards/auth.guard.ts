import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('access_token')){
    return true;
  }
  alert('User not authenticated, please login first')
  return false;
};

// ng g guard guards/auth
// TRUE => can access / FALSE => can't access route
// routes.ts => canActivate: [guardFnName]