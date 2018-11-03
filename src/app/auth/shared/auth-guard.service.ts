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
        map((currentUser: firebase.User) => {
          if (currentUser) { // User signed in
            if (routeUrl === dashboardUrl) {
              this.loggerService.log(`Can activate '/${routeUrl}'`);
              return true;
            }

            if (routeUrl === signUpUrl || routeUrl === signInUrl) {
              this.loggerService.log(`Cannot activate '/${routeUrl}'. User signed in. Navigate to '/${dashboardUrl}'`);
              this.ngZone.run(() => this.router.navigateByUrl(`/${dashboardUrl}`));
              return false;
            }
          } else { // User not signed in
            if (routeUrl === dashboardUrl || routeUrl === accountUrl) {
              this.loggerService.log(`Cannot activate '/${routeUrl}'. User not signed in. Navigate to '/${signUpUrl}'`);
              this.ngZone.run(() => this.router.navigateByUrl(`/${signUpUrl}`));
              return false;
            }
          }
          this.loggerService.log(`Can activate '/${routeUrl}'`);
          return true;
        }), catchError((error: FirebaseError) => {
          this.loggerService.error(`Cannot activate '/${routeUrl}'. Error. Navigate to '/${signUpUrl}':
            error: ${error.message ? error.message : error.code}`);
          this.ngZone.run(() => this.router.navigateByUrl(`/${signUpUrl}`));
          return of(false);
        })
      );
  }
}
