import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'sl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Sleep Log';

  constructor(public angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  signIn() {
    this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  signOut() {
    this.angularFireAuth.auth.signOut();
  }
}
