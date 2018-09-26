import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { LoggerService } from '../../core/logger.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<firebase.User>;
  public isSignedIn: boolean;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private loggerService: LoggerService,
    private ngZone: NgZone,
    private router: Router
    ) {
    this.user = angularFireAuth.authState;
    this.user.subscribe((user: firebase.User) => {
      this.isSignedIn = user ? true : false;
      this.loggerService.log(`Is signed in: ${this.isSignedIn}`);
    });
  }

  signInWithGoogle() {
    this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(result => {
      this.loggerService.log('Signed in with Google');
      this.ngZone.run(() => this.router.navigateByUrl('/dashboard'));
    }, error => {
      this.loggerService.error(`Failed to sign in with Google:
        error: ${error}`);
    });
  }

  signOut() {
    this.angularFireAuth.auth.signOut().then(result => {
      this.loggerService.log('Signed out');
      this.router.navigateByUrl('/');
    }, error => {
      this.loggerService.error(`Failed to sign out:
        error: ${error}`);
    });
  }
}
