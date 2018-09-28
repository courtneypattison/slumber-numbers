import { Injectable } from '@angular/core';

import { first } from 'rxjs/operators';

import { LoggerService } from '../../core/logger.service';
import { AuthService } from '../../auth/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private authService: AuthService, private loggerService: LoggerService) { }

  deleteAccount() {
    this.authService.authState
      .pipe(first())
      .subscribe((currentUser: firebase.User) => {
        if (currentUser) {
          currentUser.delete().then((result: void) => {
            this.loggerService.log(`Deleted account:
              currentUser.uid: ${currentUser.uid}`);
          }, (error: firebase.FirebaseError) => {
            if (error.code === 'auth/requires-recent-login') {
              this.loggerService.warn(`Delete account failed:
                currentUser.uid: ${currentUser.uid}
                error: ${error}`);
            }
          });
        }
      });
  }
}


