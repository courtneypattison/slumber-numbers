import { Component, OnDestroy, OnInit } from '@angular/core';

import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';

import { SleepTime } from 'app/sleep-time/shared/sleep-time.model';
import { SleepTimeService } from 'app/sleep-time/shared/sleep-time.service';

@Component({
  selector: 'sn-sleep-time',
  templateUrl: './sleep-time.component.html',
})
export class SleepTimeComponent implements OnDestroy, OnInit {
  sleepTimes: Observable<SleepTime[]>;

  constructor(private sleepTimeService: SleepTimeService) { }

  ngOnInit() {
    this.sleepTimes = this.sleepTimeService.getSleepTimes().pipe(untilDestroyed(this));
  }

  ngOnDestroy() { }
}
