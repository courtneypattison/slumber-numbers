import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { AuthService } from 'app/auth/shared/auth.service';
import { ErrorDialogComponent } from 'app/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'sn-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  constructor(public authService: AuthService, private matDialog: MatDialog) { }

  signIn() {
    this.authService
      .signInWithGoogle()
      .catch((error: firebase.FirebaseError) => {
        if (error.code === 'auth/account-exists-with-different-credential'
          || error.code === 'auth/cancelled-popup-request'
          || error.code === 'auth/popup-blocked'
          || error.code === 'auth/popup-closed-by-user') {
          this.openErrorDialog(error.message);
        }
      });
  }

  openErrorDialog(errorMessage: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = errorMessage;
    this.matDialog.open(ErrorDialogComponent, dialogConfig);
  }
}
