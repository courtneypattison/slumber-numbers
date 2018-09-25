import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { AuthRoutingModule } from './auth-routing.module';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { AuthGuardService } from './shared/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatButtonModule
  ],
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  providers: [AuthGuardService]
})
export class AuthModule { }
