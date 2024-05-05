import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SignUpInService } from '../services/sign-up-in.service';

export const authGuard: CanActivateFn = (route, state) => {
  // return true;
  const authService = inject(SignUpInService)
  return authService.logged_in;

};
