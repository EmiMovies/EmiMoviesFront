import { CanActivateFn, Router } from '@angular/router';
import { UsersloginService } from '../service/users.login.service';
import { inject } from '@angular/core';

import { take, map } from 'rxjs';

export const AuthGuard: CanActivateFn = () => {
  const usersService = inject(UsersloginService);
  const router = inject(Router);
  return usersService.userSubject.pipe(
    take(1),
    map((user) => {
      if (!!user) {
        return true;
      } else {
        return router.createUrlTree(['/login']);
      }
    })
  );
};
