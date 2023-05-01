import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

export function authGuard() {
  const user = inject(UserService).getLoggedInUser();
  if (!!user) return true;
  else {
    inject(Router).navigateByUrl('/signup');
    return false;
  }
}
