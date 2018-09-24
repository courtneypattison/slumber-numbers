import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { AngularFireAuth } from 'angularfire2/auth';

import { untilDestroyed } from 'ngx-take-until-destroy';

import { first } from 'rxjs/operators';

import { SleepTime } from '../shared/sleep-time.model';
import { SleepTimeService } from '../shared/sleep-time.service';

@Component({
  selector: 'sn-sleep-time-table',
  templateUrl: './sleep-time-table.component.html',
  styleUrls: ['./sleep-time-table.component.css']
})
export class SleepTimeTableComponent implements OnInit {
  displayedColumns = ['startTime', 'sleepState', 'delete'];
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
        this.dataSource = new MatTableDataSource<SleepTime>(sleepTimes);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  deleteSleepTime(index: number, startTimestamp: string) {
    this.angularFireAuth.authState.pipe(first()).subscribe(user => {
      this.sleepTimeService.deleteSleepTime(user.uid, startTimestamp);
    });
  }

}
