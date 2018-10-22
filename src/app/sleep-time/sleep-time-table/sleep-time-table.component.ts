import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { untilDestroyed } from 'ngx-take-until-destroy';

import { SleepTime } from '../shared/sleep-time.model';
import { SleepTimeService } from '../shared/sleep-time.service';

@Component({
  selector: 'sn-sleep-time-table',
  templateUrl: './sleep-time-table.component.html',
  styleUrls: ['./sleep-time-table.component.css']
})
export class SleepTimeTableComponent implements OnInit {
  displayedColumns = ['startTime', 'sleepState', 'actions'];
  dataSource: MatTableDataSource<SleepTime>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isSleepTime: boolean;

  constructor(private sleepTimeService: SleepTimeService) { }

  ngOnInit() {
    this.isSleepTime = false;
    this.drawTable();
  }

  drawTable() {
    this.sleepTimeService.getSleepTimes()
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
