import { Injectable } from '@angular/core';

import { SleepChartRow } from './sleep-chart-row.model';
import { SleepRecord } from './sleep-record.model';
import { SleepState } from './sleep-state.model';

import { LoggerService } from '../../core/logger.service';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
  sleepLog: SleepRecord[] = [];

  constructor(private logger: LoggerService) { }

  add(startDateTime: Date, sleepState: SleepState) {
    this.logger.log(`Add sleep: (startDateTime: ${startDateTime.toDateString()}, sleepState: ${sleepState})`);

    this.sleepLog.push({
      startDateTime: startDateTime,
      sleepState: sleepState
    });
  }

  addTestSleep(): void {
    this.add(new Date(2018, 7, 23, 2, 15), SleepState.Awake);
    this.add(new Date(2018, 7, 23, 2, 45), SleepState.Asleep);
    this.add(new Date(2018, 7, 23, 5, 45), SleepState.Awake);
    this.add(new Date(2018, 7, 23, 8, 20), SleepState.Asleep);
    this.add(new Date(2018, 7, 23, 9, 45), SleepState.Awake);
    this.add(new Date(2018, 7, 23, 13, 0), SleepState.Asleep);
    this.add(new Date(2018, 7, 23, 13, 10), SleepState.Awake);
    this.add(new Date(2018, 7, 23, 15, 14), SleepState.Asleep);
    this.add(new Date(2018, 7, 23, 16, 30), SleepState.Awake);
    this.add(new Date(2018, 7, 23, 20, 30), SleepState.Asleep);

    this.add(new Date(2018, 7, 24, 1, 15), SleepState.Awake);
    this.add(new Date(2018, 7, 24, 1, 35), SleepState.Asleep);
    this.add(new Date(2018, 7, 24, 4, 30), SleepState.Awake);
    this.add(new Date(2018, 7, 24, 4, 50), SleepState.Asleep);
    this.add(new Date(2018, 7, 24, 7, 15), SleepState.Awake);
    this.add(new Date(2018, 7, 24, 9, 50), SleepState.Asleep);
    this.add(new Date(2018, 7, 24, 10, 10), SleepState.Awake);
    this.add(new Date(2018, 7, 24, 14, 40), SleepState.Asleep);
    this.add(new Date(2018, 7, 24, 17, 20), SleepState.Awake);
    this.add(new Date(2018, 7, 24, 20, 45), SleepState.Asleep);
    this.add(new Date(2018, 7, 24, 23, 50), SleepState.Awake);

    this.add(new Date(2018, 7, 25, 0, 5), SleepState.Asleep);
    this.add(new Date(2018, 7, 25, 1, 45), SleepState.Awake);
    this.add(new Date(2018, 7, 25, 2, 0), SleepState.Asleep);
    this.add(new Date(2018, 7, 25, 4, 15), SleepState.Awake);
    this.add(new Date(2018, 7, 25, 4, 30), SleepState.Asleep);
    this.add(new Date(2018, 7, 25, 7, 0), SleepState.Awake);
    this.add(new Date(2018, 7, 25, 9, 0), SleepState.Crying);
    this.add(new Date(2018, 7, 25, 9, 25), SleepState.Asleep);
    this.add(new Date(2018, 7, 25, 10, 40), SleepState.Awake);
    this.add(new Date(2018, 7, 25, 13, 35), SleepState.Crying);
    this.add(new Date(2018, 7, 25, 14, 0), SleepState.Asleep);
    this.add(new Date(2018, 7, 25, 16, 15), SleepState.Awake);
    this.add(new Date(2018, 7, 25, 20, 15), SleepState.Asleep);

    this.add(new Date(2018, 7, 26, 1, 40), SleepState.Awake);
    this.add(new Date(2018, 7, 26, 2, 0), SleepState.Asleep);
    this.add(new Date(2018, 7, 26, 5, 0), SleepState.Awake);
    this.add(new Date(2018, 7, 26, 5, 40), SleepState.Asleep);
    this.add(new Date(2018, 7, 26, 7, 30), SleepState.Awake);
    this.add(new Date(2018, 7, 26, 9, 40), SleepState.Crying);
    this.add(new Date(2018, 7, 26, 9, 45), SleepState.Asleep);
    this.add(new Date(2018, 7, 26, 11, 40), SleepState.Awake);
    this.add(new Date(2018, 7, 26, 14, 5), SleepState.Crying);
    this.add(new Date(2018, 7, 26, 14, 15), SleepState.Asleep);
    this.add(new Date(2018, 7, 26, 15, 35), SleepState.Awake);
    this.add(new Date(2018, 7, 26, 20, 0), SleepState.Crying);
    this.add(new Date(2018, 7, 26, 20, 15), SleepState.Asleep);

    this.add(new Date(2018, 7, 27, 1, 40), SleepState.Awake);
    this.add(new Date(2018, 7, 27, 2, 0), SleepState.Asleep);
    this.add(new Date(2018, 7, 27, 4, 0), SleepState.Awake);
    this.add(new Date(2018, 7, 27, 4, 15), SleepState.Asleep);
    this.add(new Date(2018, 7, 27, 7, 15), SleepState.Awake);
    this.add(new Date(2018, 7, 27, 9, 5), SleepState.Asleep);
    this.add(new Date(2018, 7, 27, 10, 25), SleepState.Awake);
    this.add(new Date(2018, 7, 27, 13, 0), SleepState.Asleep);
    this.add(new Date(2018, 7, 27, 15, 10), SleepState.Awake);
    this.add(new Date(2018, 7, 27, 19, 5), SleepState.Asleep);
    this.add(new Date(2018, 7, 27, 23, 40), SleepState.Awake);
    this.add(new Date(2018, 7, 27, 24, 0), SleepState.Asleep);

    this.add(new Date(2018, 7, 28, 5, 15), SleepState.Awake);
    this.add(new Date(2018, 7, 28, 6, 55), SleepState.Asleep);
    this.add(new Date(2018, 7, 28, 8, 0), SleepState.Awake);
    this.add(new Date(2018, 7, 28, 10, 0), SleepState.Asleep);
    this.add(new Date(2018, 7, 28, 11, 0), SleepState.Awake);
    this.add(new Date(2018, 7, 28, 13, 0), SleepState.Asleep);
    this.add(new Date(2018, 7, 28, 13, 55), SleepState.Awake);
    this.add(new Date(2018, 7, 28, 16, 50), SleepState.Asleep);
    this.add(new Date(2018, 7, 28, 17, 30), SleepState.Awake);
    this.add(new Date(2018, 7, 28, 19, 0), SleepState.Asleep);

    this.add(new Date(2018, 7, 29, 1, 30), SleepState.Awake);
    this.add(new Date(2018, 7, 29, 1, 50), SleepState.Asleep);
    this.add(new Date(2018, 7, 29, 6, 30), SleepState.Awake);
    this.add(new Date(2018, 7, 29, 8, 40), SleepState.Crying);
    this.add(new Date(2018, 7, 29, 9, 10), SleepState.Awake);
    this.add(new Date(2018, 7, 29, 10, 0), SleepState.Crying);
    this.add(new Date(2018, 7, 29, 10, 30), SleepState.Asleep);
    this.add(new Date(2018, 7, 29, 11, 25), SleepState.Awake);
    this.add(new Date(2018, 7, 29, 13, 35), SleepState.Crying);
    this.add(new Date(2018, 7, 29, 13, 40), SleepState.Asleep);
    this.add(new Date(2018, 7, 29, 14, 25), SleepState.Awake);
    this.add(new Date(2018, 7, 29, 18, 45), SleepState.Crying);
    this.add(new Date(2018, 7, 29, 19, 15), SleepState.Asleep);
  }

  getSleepChartRows(): SleepChartRow[] {
    this.logger.log('Get sleep chart rows');

    const sleepChartRows = [];

    for (let i = 0, j = 0; i < this.sleepLog.length; i++, j++) {
      const currStartDateTime = this.sleepLog[i].startDateTime;
      const currStartTime = new Date(0, 0, 0, currStartDateTime.getHours(), currStartDateTime.getMinutes());

      if (i > 0) {
        const endDateTimeIndex = 3;
        const prevStartDateTime = this.sleepLog[i - 1].startDateTime;

        if (prevStartDateTime.toDateString() === currStartDateTime.toDateString()) { // Same day
          sleepChartRows[j - 1][endDateTimeIndex] = currStartTime;
        } else { // New day
          sleepChartRows[j - 1][endDateTimeIndex] = new Date(0, 0, 0, 24, 0);
          sleepChartRows.push([
            currStartDateTime.toDateString(),
            this.sleepLog[i - 1].sleepState,
            new Date(0, 0, 0, 0, 0),
            currStartTime
          ]);
          j++;
        }
      }

      sleepChartRows.push([
        currStartDateTime.toDateString(),
        this.sleepLog[i].sleepState,
        currStartTime,
        currStartTime
      ]);
    }

    return sleepChartRows;
  }

  getSleepLog() {
    this.logger.log('Get sleep log');

    return this.sleepLog;
  }
}
