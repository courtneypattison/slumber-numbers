import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AccountComponent } from 'app/account/account.component';
import { AuthGuardService } from 'app/auth/shared/auth-guard.service';

const accountRoutes = [
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(accountRoutes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {

}
