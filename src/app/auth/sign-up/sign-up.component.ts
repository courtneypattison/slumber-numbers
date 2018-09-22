import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'sl-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(public angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  signUp() {
    this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
}
