import { Injectable, NgZone } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoggerService } from '../../core/logger.service';
import { AuthService } from './auth.service';

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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isSignedIn) {
      if (route.url.toString() === 'dashboard') {
        this.loggerService.log(`Can activate:
          route: ${route}
          state: ${state}`);
        return true;
      }

      if (route.url.toString() === 'signup' || route.url.toString() === 'signin') {
        this.loggerService.log(`Cannot activate. User signed in. Navigate to '/dashboard':
          route: ${route}
          state: ${state}`);
        this.ngZone.run(() => this.router.navigateByUrl('/dashboard'));
        return false;
      }
    } else {
      if (route.url.toString() === 'dashboard' || route.url.toString() === 'account') {
        this.loggerService.log(`Cannot activate. User not signed in. Navigate to '/signup':
          route: ${route}
          state: ${state}`);
        this.ngZone.run(() => this.router.navigateByUrl('/signup'));
        return false;
      }
    }
    this.loggerService.log(`Can activate:
            route: ${route}
            state: ${state}`);
    return true;
  }
}
