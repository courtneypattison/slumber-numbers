import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { User } from 'firebase/app';

import { AuthService } from 'app/auth/shared/auth.service';
import { LoggerService } from 'app/core/logger.service';
import { SleepTimeService } from '../../sleep-time/shared/sleep-time.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private angularFirestore: AngularFirestore,
    private authService: AuthService,
    private logger: LoggerService,
    private sleepTimeService: SleepTimeService,
  ) { }

  deleteAccount(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.authService.getCurrentUser()
        .then((currentUser: User) => {
          this.sleepTimeService.deleteAllSleepTimes()
            .then(() => {
              this.deleteAccountDoc(currentUser.uid)
                .then(() => {
                  this.deleteAccountAuth(currentUser)
                    .then(() => {
                      this.authService.signOut();
                      resolve();
                    })
                    .catch((error: Error) => reject(error));
                })
                .catch((error: Error) => reject(error));
            })
            .catch((error: Error) => reject(error));
        })
        .catch((error: Error) => reject(error));
    });
  }

  private deleteAccountDoc(uid: string): Promise<void> {
    return this.logger.logPromise(
      'Deleted account doc',
      'Failed to delete account doc',
      this.angularFirestore
        .doc<Account>(`accounts/${uid}`)
        .delete()
    );
  }

  private deleteAccountAuth(currentUser: User): Promise<void> {
    return this.logger.logPromise(
      'Deleted account auth',
      'Failed to delete account auth',
      currentUser.delete()
    );
  }
}
