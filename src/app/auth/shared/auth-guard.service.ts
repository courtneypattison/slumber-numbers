import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { FirebaseError } from 'firebase';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthService } from 'app/auth/shared/auth.service';
import { LoggerService } from 'app/core/logger.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private loggerService: LoggerService,
    private ngZone: NgZone,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const routeUrl = route.url.toString();
    const accountUrl = 'account';
    const dashboardUrl = 'dashboard';
    const signInUrl = 'signin';
    const signUpUrl = 'signup';

    return this.authService.getCurrentUserState()
      .pipe(
        map((currentUser: firebase.User) => { // User signed in
          if (routeUrl === dashboardUrl || routeUrl === accountUrl) {
            this.loggerService.log(`Can activate '/${routeUrl}'`);

            return true;
          } else {
            this.loggerService.log(`Cannot activate '/${routeUrl}'. Navigate to '/${dashboardUrl}'`);
            this.ngZone.run(() => this.router.navigateByUrl(`/${dashboardUrl}`));

            return false;
          }

        }), catchError((error: Error) => { // No user signed in
          if (routeUrl === signUpUrl || routeUrl === signInUrl) {
            this.loggerService.log(`Can activate '/${routeUrl}'.`);

            return of(true);
          } else {
            this.loggerService.error(`Cannot activate '/${routeUrl}'. Navigate to '/${signUpUrl}'`);
            this.ngZone.run(() => this.router.navigateByUrl(`/${signUpUrl}`));

            return of(false);
          }
        })
      );
  }
}
