import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/auth/shared/auth.service';

@Component({
  selector: 'sn-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, private ngZone: NgZone) { }

  ngOnInit() {
  }

  signUp() {
    this.authService.signInWithGoogle();
  }
}
