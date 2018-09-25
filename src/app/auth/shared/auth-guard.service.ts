import { Injectable, NgZone } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoggerService } from '../../core/logger.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private loggerService: LoggerService,
    private ngZone: NgZone,
    private router: Router,
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
    const signUpUrl = '/signup';
    return this.angularFireAuth.authState.pipe(
      map(user => {
        if (user) {
          this.loggerService.log(`Can activate:
            route: ${route}
            state: ${state}`);
          return true;
        } else {
          this.loggerService.log(`Cannot activate. User not signed in. Navigate to ${signUpUrl}:
            route: ${route}
            state: ${state}`);
          this.ngZone.run(() => this.router.navigateByUrl(signUpUrl));
          return false;
        }
      }),
      catchError((error) => {
        this.loggerService.log(`Error activating. Navigate to ${signUpUrl}:
            route: ${route}
            state: ${state}
            error: ${error}`);
        this.ngZone.run(() => this.router.navigateByUrl(signUpUrl));
        return of(false);
      })
    );
  }
}
