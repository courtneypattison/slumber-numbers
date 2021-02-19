import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AccountService } from 'app/account/shared/account.service';
import { AuthService } from 'app/auth/shared/auth.service';
import { ErrorDialogComponent } from 'app/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'sn-account-delete',
  templateUrl: './account-delete.component.html',
})
export class AccountDeleteComponent {

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private matDialog: MatDialog,
    private router: Router
  ) { }

  deleteAccount() {
    this.accountService
      .deleteAccount()
      .catch((error) => {
        if (error.code && error.code === 'auth/requires-recent-login') {
          this.openErrorDialog(error.message);
          this.authService
            .signOut()
            .then(() => {
              this.router.navigateByUrl(`/signin`);
            });
        }
      });
  }

  openErrorDialog(errorMessage: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = errorMessage;
    this.matDialog.open(ErrorDialogComponent, dialogConfig);
  }

}
