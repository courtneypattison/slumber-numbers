import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { AuthService } from 'app/auth/shared/auth.service';
import { AuthProvider } from 'app/auth/shared/auth-provider.model';
import { ErrorDialogComponent } from 'app/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'sn-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  AuthProvider = AuthProvider;

  constructor(public authService: AuthService, private matDialog: MatDialog) { }

  signIn(authProvider: AuthProvider) {
    this.authService
      .signIn(authProvider)
      .catch((error: firebase.FirebaseError) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
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
