import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { AccountDeleteComponent } from './account-delete/account-delete.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
  ],
  declarations: [AccountComponent, AccountDeleteComponent]
})
export class AccountModule { }
