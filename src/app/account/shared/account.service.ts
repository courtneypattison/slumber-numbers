import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { LoggerService } from '../../core/logger.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private angularFireAuth: AngularFireAuth, private loggerService: LoggerService) { }

  deleteAccount() {
    this.angularFireAuth.auth.currentUser.delete();
  }
}
