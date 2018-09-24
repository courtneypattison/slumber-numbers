import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'sn-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(public angularFireAuth: AngularFireAuth, private router: Router, private ngZone: NgZone) { }

  ngOnInit() {
  }

  signUp() {
    this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(result => {
      this.ngZone.run(() => this.router.navigateByUrl('/dashboard'));
    }, error => {

    });
  }
}
