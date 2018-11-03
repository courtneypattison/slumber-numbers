import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/auth/shared/auth.service';

@Component({
  selector: 'sn-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, private ngZone: NgZone) { }

  ngOnInit() {
  }

  signIn() {
    this.authService.signInWithGoogle();
  }
}
