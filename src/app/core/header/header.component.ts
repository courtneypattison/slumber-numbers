import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

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

  signOut() {
    this.angularFireAuth.auth.signOut();
  }
}
