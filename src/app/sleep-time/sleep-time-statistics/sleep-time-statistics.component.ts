import { Component, OnDestroy, OnInit } from '@angular/core';

import { untilDestroyed } from 'ngx-take-until-destroy';

import { SleepTime } from 'app/sleep-time/shared/sleep-time.model';
import { SleepTimeService } from 'app/sleep-time/shared/sleep-time.service';

@Component({
  selector: 'sn-sleep-time-statistics',
  templateUrl: './sleep-time-statistics.component.html',
})
export class SleepTimeStatisticsComponent implements OnDestroy, OnInit {
  averageDailySleep: number;

  constructor(private sleepTimeService: SleepTimeService) { }

  ngOnInit() {
    this.sleepTimeService.getSleepTimes()
      .pipe(untilDestroyed(this))
      .subscribe((sleepTimes: SleepTime[]) => {
        this.averageDailySleep = this.sleepTimeService.getAverageDailySleep(sleepTimes);
      });
  }

  ngOnDestroy() {}

}
