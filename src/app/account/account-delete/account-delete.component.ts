import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';

import { FirebaseError } from 'firebase/app';

import { AccountService } from 'app/account/shared/account.service';
import { AuthService } from 'app/auth/shared/auth.service';
import { ErrorDialogComponent } from 'app/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'sn-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.css']
})
export class AccountDeleteComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private matDialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
  }

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
