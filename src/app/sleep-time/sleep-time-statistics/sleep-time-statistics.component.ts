import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { SleepTime } from 'app/sleep-time/shared/sleep-time.model';
import { SleepTimeService } from 'app/sleep-time/shared/sleep-time.service';

@Component({
  selector: 'sn-sleep-time-statistics',
  templateUrl: './sleep-time-statistics.component.html',
})
export class SleepTimeStatisticsComponent implements OnInit {
  @Input() sleepTimes: Observable<SleepTime[]>;
  averageDailySleep: number;

  constructor(private sleepTimeService: SleepTimeService) { }

  ngOnInit() {
    this.sleepTimes.subscribe((sleepTimes: SleepTime[]) => {
      this.averageDailySleep = this.sleepTimeService.getAverageDailySleep(sleepTimes);
    });
  }
}
