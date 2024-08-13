import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GeneralService } from '../Services/GeneralService/generalservice.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const generalService = inject(GeneralService);

  // Check if `localStorage` is available
  if (typeof localStorage !== 'undefined') {
    const loginUser = localStorage.getItem(generalService.userKey);

    if (loginUser) {
      // User is logged in, allow navigation
      return true;
    } else {
      // User is not logged in, redirect to login
      router.navigate(['/login']);
      return false;
    }
  } else {
    // `localStorage` is not available, redirect to login
    router.navigate(['/login']);
    return false;
  }
};
