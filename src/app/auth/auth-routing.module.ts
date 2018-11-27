import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuardService } from 'app/auth/shared/auth-guard.service';
import { SignInComponent } from 'app/auth/sign-in/sign-in.component';
import { SignUpComponent } from 'app/auth/sign-up/sign-up.component';

const authRoutes = [
  { path: 'signup', component: SignUpComponent, canActivate: [AuthGuardService] },
  { path: 'signin', component: SignInComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
