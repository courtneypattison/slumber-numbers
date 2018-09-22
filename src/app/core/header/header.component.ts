import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'sl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Sleep Log';

  constructor(public angularFireAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  signOut() {
    this.angularFireAuth.auth.signOut();
    this.router.navigate(['/signup']);
  }
}
