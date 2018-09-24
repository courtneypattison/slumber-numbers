import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'sn-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public angularFireAuth: AngularFireAuth, private router: Router, private ngZone: NgZone) { }

  ngOnInit() {
  }

  signIn() {
    this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(result => {
      this.ngZone.run(() => this.router.navigateByUrl('/dashboard'));
    }, error => {

    });
  }
}
