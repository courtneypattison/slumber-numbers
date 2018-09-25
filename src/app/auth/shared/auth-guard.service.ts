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
    return this.angularFireAuth.authState.pipe(
      map(user => {
        if (user && route.url.toString() === 'dashboard') {
          this.loggerService.log(`Can activate:
            route: ${route}
            state: ${state}`);
          return true;
        }
        if (!user && route.url.toString() === 'dashboard') {
          this.loggerService.log(`Cannot activate. User not signed in. Navigate to '/signup':
            route: ${route}
            state: ${state}`);
          this.ngZone.run(() => this.router.navigateByUrl('/signup'));
          return false;
        }
        if (user && (route.url.toString() === 'signup' || route.url.toString() === 'signin')) {
          this.loggerService.log(`Cannot activate. User signed in. Navigate to '/dashboard':
            route: ${route}
            state: ${state}`);
          this.ngZone.run(() => this.router.navigateByUrl('/dashboard'));
          return false;
        }
        this.loggerService.log(`Can activate:
            route: ${route}
            state: ${state}`);
        return true;
      }),
      catchError((error) => {
        this.loggerService.log(`Error authenticating. Navigate to '/signup':
            route: ${route}
            state: ${state}
            error: ${error}`);
        this.ngZone.run(() => this.router.navigateByUrl('/signup'));
        return of(false);
      })
    );
  }
}
