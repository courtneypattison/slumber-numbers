import { Component, OnInit } from '@angular/core';

import { AccountService } from '../shared/account.service';

@Component({
  selector: 'sn-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.css']
})
export class AccountDeleteComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  deleteAccount() {
    this.accountService.deleteAccount();
  }

}
