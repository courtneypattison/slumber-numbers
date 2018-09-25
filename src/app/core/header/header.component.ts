import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/shared/auth.service';

@Component({
  selector: 'sn-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Slumber Numbers';

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signOut() {
    this.authService.signOut();
  }
}
