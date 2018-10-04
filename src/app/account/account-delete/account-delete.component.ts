import { Component, OnInit } from '@angular/core';

import { AccountService } from '../shared/account.service';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { AuthService } from '../../auth/shared/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';

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
      .catch((error: firebase.FirebaseError) => {
        if (error.code === 'auth/requires-recent-login') {
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
