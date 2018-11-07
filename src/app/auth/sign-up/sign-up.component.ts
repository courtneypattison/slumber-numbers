import { Component } from '@angular/core';

import { AuthService } from 'app/auth/shared/auth.service';

@Component({
  selector: 'sn-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(public authService: AuthService) { }

  signUp() {
    this.authService.signInWithGoogle();
  }
}
