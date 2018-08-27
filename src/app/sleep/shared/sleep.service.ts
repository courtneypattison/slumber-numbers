import { Injectable } from '@angular/core';

import { SleepChartRow } from './sleep-chart-row.model';
import { SleepRecord } from './sleep-record.model';
import { SleepState } from './sleep-state.model';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
  sleepLog: SleepRecord[] = [];

  constructor() { }

  add(startDateTime: Date, sleepState: SleepState) {
    this.sleepLog.push({
      startDateTime: startDateTime,
      sleepState: sleepState
    });
    // if (this.sleepLog.length) {
    //   if (this.sleepLog[this.sleepLog.length - 1].startDateTime.toDateString() === startDateTime.toDateString()) { // Same day
    //     this.sleepLog[this.sleepLog.length - 1].endDateTime = startDateTime;
    //   } else { // New day
    //     this.sleepLog[this.sleepLog.length - 1].endDateTime = new Date(0, 0, 0, 24, 0); // End of day
    //     this.sleepLog.push({
    //       sleepState: this.sleepLog[this.sleepLog.length - 1].sleepState,
    //       startDateTime: new Date(0, 0, 0, 0, 0), // Beginning of day
    //     });
    //   }
    // }
  }

  addTestSleep(): void {
    this.add(new Date(2018, 7, 23, 0, 0), SleepState.Asleep);
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
  }

  getSleepChartRows(): SleepChartRow[] {
    const sleepChartRows = [];
    for (let i = 0; i < this.sleepLog.length; i++) {
      sleepChartRows.push([
        this.sleepLog[i].startDateTime.toDateString(),
        this.sleepLog[i].sleepState,
        this.sleepLog[i].startDateTime,
        (this.sleepLog.length && i + 1 < this.sleepLog.length) ? this.sleepLog[i + 1].startDateTime : this.sleepLog[i].startDateTime
      ]);
    }

    return sleepChartRows;
  }

  getSleepLog() {
    return this.sleepLog;
  }
}
