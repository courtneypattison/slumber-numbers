import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { untilDestroyed } from 'ngx-take-until-destroy';

import { SleepTime } from 'app/sleep-time/shared/sleep-time.model';
import { SleepTimeService } from 'app/sleep-time/shared/sleep-time.service';

@Component({
  selector: 'sn-sleep-time-table',
  templateUrl: './sleep-time-table.component.html',
  styleUrls: ['./sleep-time-table.component.css']
})
export class SleepTimeTableComponent implements OnDestroy, OnInit {
  displayedColumns = ['startTime', 'state', 'actions'];
  dataSource: MatTableDataSource<SleepTime>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isSleepTime: boolean;

  constructor(private sleepTimeService: SleepTimeService) { }

  ngOnInit() {
    this.isSleepTime = false;
    this.drawTable();
  }

  ngOnDestroy() { }

  drawTable() {
    this.sleepTimeService.getSleepTimes('desc')
      .pipe(untilDestroyed(this))
      .subscribe((sleepTimes: SleepTime[]) => {
        if (sleepTimes.length) {
          this.isSleepTime = true;
        } else {
          this.isSleepTime = false;
          return;
        }

        this.dataSource = new MatTableDataSource<SleepTime>(sleepTimes);
        this.dataSource.paginator = this.paginator;
      });
  }

  downloadCSV() {
    this.sleepTimeService.downloadCSV();
  }

  deleteSleepTime(startTimestamp: string) {
    this.sleepTimeService.deleteSleepTime(startTimestamp);
  }

}
