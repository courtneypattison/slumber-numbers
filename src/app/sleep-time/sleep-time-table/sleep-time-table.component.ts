import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { AngularFireAuth } from 'angularfire2/auth';

import { untilDestroyed } from 'ngx-take-until-destroy';

import { first } from 'rxjs/operators';

import { SleepTime } from '../shared/sleep-time.model';
import { SleepTimeService } from '../shared/sleep-time.service';

@Component({
  selector: 'sl-sleep-time-table',
  templateUrl: './sleep-time-table.component.html',
  styleUrls: ['./sleep-time-table.component.css']
})
export class SleepTimeTableComponent implements OnInit {
  private sleepTimes: SleepTime[];

  displayedColumns = ['startTime', 'sleepState'];
  dataSource: MatTableDataSource<SleepTime>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private sleepTimeService: SleepTimeService, public angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.getSleepTimes();
  }

  getSleepTimes() {
    this.angularFireAuth.authState.pipe(first()).subscribe(user => {
      this.sleepTimeService.getSleepTimes(user.uid)
      .pipe(untilDestroyed(this))
      .subscribe((sleepTimes: SleepTime[]) => {
        console.log(sleepTimes);
        this.dataSource = new MatTableDataSource<SleepTime>(sleepTimes);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

}
