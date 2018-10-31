import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFirestore } from 'angularfire2/firestore';
import { User, firestore } from 'firebase/app';

import { AuthService } from '../../auth/shared/auth.service';
import { LoggerService } from '../../core/logger.service';
import { SleepTimeService } from '../../sleep-time/shared/sleep-time.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private angularFirestore: AngularFirestore,
    private authService: AuthService,
    private loggerService: LoggerService,
    private sleepTimeService: SleepTimeService,
  ) { }

  deleteAccount(): Promise<void> {
    return new Promise((resolve, reject) => {
    this.authService
      .getCurrentUser()
      .subscribe((currentUser: User) => {
        if (currentUser) {
          // Delete account sleep times
          this.sleepTimeService.deleteAllSleepTimes()
            .then(() => {
              // Delete account firestore document
              this.angularFirestore
                .doc<Account>(`accounts/${currentUser.uid}`)
                .delete()
                .then(() => {
                  this.loggerService.log(`Deleted account document at:
                    'accounts/${currentUser.uid}'`);

                  // Delete account
                  currentUser
                    .delete()
                    .then((result: void) => {
                      this.loggerService.log(`Deleted account:
                        currentUser.uid: ${currentUser.uid}`);
                      this.authService.signOut();
                      resolve();
                    }).catch((error: firebase.FirebaseError) => {
                      if (error.code === 'auth/requires-recent-login') {
                        this.loggerService.error(`Delete account failed:
                          currentUser.uid: ${currentUser.uid}
                          ${error.message ? error.message : error.code}`);
                        reject(error);
                      }
                    });
                })
                .catch((error: firestore.FirestoreError) => {
                  this.loggerService.error(`Couldn't delete account document at:
                    'accounts/${currentUser.uid}'
                    ${error.message ? error.message : error.code}`);
                });
            });
        }
      });
    });
  }
}


