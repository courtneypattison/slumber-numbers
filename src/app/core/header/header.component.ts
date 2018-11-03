import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from 'app/auth/shared/auth.service';

@Component({
  selector: 'sn-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Slumber Numbers';
  userInitial: Observable<string>;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userInitial = this.authService.getUserInitial();
  }

  signOut() {
    this.authService.signOut();
  }
}
