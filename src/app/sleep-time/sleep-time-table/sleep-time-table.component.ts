import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Observable } from 'rxjs';

import { SleepTime } from 'app/sleep-time/shared/sleep-time.model';
import { SleepTimeService } from 'app/sleep-time/shared/sleep-time.service';

@Component({
  selector: 'sn-sleep-time-table',
  templateUrl: './sleep-time-table.component.html',
  styleUrls: ['./sleep-time-table.component.scss']
})
export class SleepTimeTableComponent implements OnInit {
  @Input() sleepTimes: Observable<SleepTime[]>;
  displayedColumns = ['startTime', 'state', 'actions'];
  dataSource: MatTableDataSource<SleepTime>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isSleepTime: boolean;

  constructor(private sleepTimeService: SleepTimeService) { }

  ngOnInit() {
    this.isSleepTime = false;
    this.drawTable();
  }

  drawTable() {
    this.sleepTimes
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
