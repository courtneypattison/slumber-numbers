import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { AccountComponent } from 'app/account/account.component';
import { AccountDeleteComponent } from 'app/account/account-delete/account-delete.component';
import { AccountRoutingModule } from 'app/account/account-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatButtonModule,
  ],
  declarations: [AccountComponent, AccountDeleteComponent]
})
export class AccountModule { }
