import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { AuthRoutingModule } from 'app/auth/auth-routing.module';
import { AuthService } from 'app/auth/shared/auth.service';
import { AuthGuardService } from 'app/auth/shared/auth-guard.service';
import { SignInComponent } from 'app/auth/sign-in/sign-in.component';
import { SignUpComponent } from 'app/auth/sign-up/sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatButtonModule,
  ],
  declarations: [
    SignInComponent,
    SignUpComponent,
  ],
  providers: [
    AuthGuardService,
    AuthService,
  ]
})
export class AuthModule { }
