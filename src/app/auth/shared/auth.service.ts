import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { User } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';

import { LoggerService } from 'app/core/logger.service';
import { Account } from 'app/account/shared/account.model';

export const NoUserError = Error('There is no user signed in.');

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private aFirestore: AngularFirestore,
    private logger: LoggerService,
    private ngZone: NgZone,
    private router: Router,
  ) {
    this.user = angularFireAuth.user;
   }

  getCurrentUser(): Promise<User> {
    this.logger.log('getCurrentUser()');

    return new Promise((resolve, reject) => {
      this.getCurrentUserState().subscribe((currentUser: User) => {
        resolve(currentUser);
      }, (error) => {
        reject(error);
      });
    });
  }

  getCurrentUserState(): Observable<User> {
    this.logger.log('getCurrentUserState()');

    return this.angularFireAuth.user.pipe(
      first(),
      map((currentUser: User) => {
        if (currentUser) {
          this.logger.log(`Got current user state: currentUser.uid: ${currentUser.uid}`);

          return currentUser;
        } else {
          this.logger.log(`Couldn't get current user state: NoUserError: ${NoUserError}`);

          throw NoUserError;
        }
      })
    );
  }

  getUserInitial(): Observable<string> {
    this.logger.log('getUserInital()');

    return this.getCurrentUserState()
      .pipe(
        map((currentUser: User) => {
          const userInitial = currentUser.email[0];
          this.logger.log(`Got user initial: ${userInitial}`);

          return userInitial;
        }),
        catchError(() => {
          return of('');
        })
      );
  }

  signInWithGoogle(): Promise<void> {
    this.logger.log('signInWithGoogle()');

    return new Promise((resolve, reject) => {
      this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((userCredential: firebase.auth.UserCredential) => {
          this.logger.log('Signed in with Google');

          this.setAccountDoc(userCredential.user.uid)
            .then(() => {
              this.ngZone.run(() => this.router.navigateByUrl('/dashboard'));

              resolve();
            })
            .catch((error: firebase.firestore.FirestoreError) => reject(error));
        })
        .catch((error: firebase.auth.Error) => {
          this.logger.error(`Failed to sign in with Google: error: ${error.message}`);

          reject(error);
        });
    });
  }

  signOut(): Promise<void> {
    this.logger.log('signOut()');

    return new Promise((resolve, reject) => {
      this.angularFireAuth.auth.signOut()
        .then(() => {
          this.logger.log('Signed out');
          this.ngZone.run(() => this.router.navigateByUrl('/'));

          resolve();
        })
        .catch((error: firebase.auth.Error) => {
          this.logger.error(`Failed to sign out: error: ${error.message}`);

          reject(error);
        });
    });
  }

  private setAccountDoc(uid: string): Promise<void> {
    this.logger.log(`setAccount(uid: ${uid})`);

    return this.logger.logPromise(
      'Set user account doc in firestore',
      'Failed to set user account doc in firestore',
      this.aFirestore
        .collection<Account>('accounts')
        .doc(uid)
        .set({ uid: uid })
    );
  }
}
