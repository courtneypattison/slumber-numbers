import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { AuthGuardService } from '../auth/shared/auth-guard.service';

const accountRoutes = [
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(accountRoutes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {

}
