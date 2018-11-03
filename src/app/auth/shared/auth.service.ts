import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable, throwError } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';

import { LoggerService } from 'app/core/logger.service';
import { Account } from 'app/account/shared/account.model';

export const NO_USER_ERROR = {
  code: 'no-user-signed-in',
  message: 'There is no user signed in.'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<firebase.User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private loggerService: LoggerService,
    private ngZone: NgZone,
    private router: Router
  ) {
    this.user = angularFireAuth.user;

  }

  signInWithGoogle() {
    this.loggerService.log('signInWithGoogle()');

    this.angularFireAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userCredential: firebase.auth.UserCredential) => {
        this.loggerService.log('Signed in with Google');
        const uid = userCredential.user.uid;

        this.angularFirestore
          .collection<Account>('accounts')
          .doc(uid)
          .set({
            uid: uid
          })
          .then(() => {
            this.loggerService.log(`Set user account doc in firestore:
              uid: ${uid}`);
            this.ngZone.run(() => this.router.navigateByUrl('/dashboard'));
          })
          .catch((error: firebase.firestore.FirestoreError) => {
            this.loggerService.error(`Failed to set user account doc in firestore:
              uid: ${uid}
              error: ${error.message ? error.message : error.code.toString()}`);
          });
      }).catch((error: firebase.auth.Error) => {
        this.loggerService.error(`Failed to sign in with Google:
          error: ${error.message ? error.message : error.code}`);
      });
  }

  signOut(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.auth
        .signOut()
        .then((result: void) => {
          this.loggerService.log('Signed out');
          this.router.navigateByUrl('/');

          resolve();
        })
        .catch((error: firebase.auth.Error) => {
          this.loggerService.error(`Failed to sign out:
            error: ${error.message ? error.message : error.code}`);

          reject(error);
        });
    });
  }

  getCurrentUserState(): Observable<firebase.User> {
    return this.user
      .pipe(
        first(),
        map((currentUser: firebase.User) => {
          if (currentUser) {
            this.loggerService.log(`Got current user state:
              currentUser.uid: ${currentUser.uid}`);

            return currentUser;
          } else {
            this.loggerService.log(`Couldn't get current user state:
              NO_USER_ERROR.message: ${NO_USER_ERROR.message}`);

            throwError(NO_USER_ERROR);
          }
        })
      );
  }

  getCurrentUser(): Promise<firebase.User> {
    this.loggerService.log('getCurrentUser()');

    return new Promise((resolve, reject) => {
      this.user
        .pipe(first())
        .subscribe((currentUser: firebase.User) => {
          if (currentUser) {
            this.loggerService.log(`Got current user:
              currentUser.uid: ${currentUser.uid}`);

            resolve(currentUser);
          } else {
            this.loggerService.log(`Couldn't get current user:
              NO_USER_ERROR.message: ${NO_USER_ERROR.message}`);

            reject(NO_USER_ERROR);
          }
        }, (error: firebase.FirebaseError) => {
          this.loggerService.log(`Couldn't get current user:
              error.message: ${error.message ? error.message : error.code}`);

          reject(error);
        });
    });
  }

  getUserInitial(): Observable<string> {
    this.loggerService.log('getUserInital()');

    return this.getCurrentUserState()
      .pipe(
        map((currentUser: firebase.User) => {
          const userInitial = currentUser.email[0];
          this.loggerService.log(`Got user initial:
            userInital: ${userInitial}`);
          return userInitial;
        }),
        catchError((error) => {
          return '';
        })
      );
  }
}
