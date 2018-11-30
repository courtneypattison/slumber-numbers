import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuardService } from 'app/auth/shared/auth-guard.service';
import { SignInComponent } from 'app/auth/sign-in/sign-in.component';

const authRoutes = [
  { path: 'signin', component: SignInComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
