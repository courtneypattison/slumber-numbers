import { Injectable } from '@angular/core';

import { SleepRecord } from './sleep-record.model';
import { SleepState } from './sleep-state.model';

@Injectable({
  providedIn: 'root'
})
export class SleepLogService {
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

  getSleepLog() {
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

    return this.sleepLog;

    // return [
    //   [ new Date('August 23, 2018').toDateString(), 'Asleep', new Date(0, 0, 0, 0, 0), new Date(0, 0, 0, 2, 15) ],
    //   [ new Date('August 23, 2018').toDateString(), 'Awake', new Date(0, 0, 0, 2, 15), new Date(0, 0, 0, 2, 45) ],
    //   [ new Date('August 23, 2018').toDateString(), 'Asleep', new Date(0, 0, 0, 2, 45), new Date(0, 0, 0, 5, 45) ],
    //   [ new Date('August 23, 2018').toDateString(), 'Awake', new Date(0, 0, 0, 5, 45), new Date(0, 0, 0, 8, 20) ],
    //   [ new Date('August 23, 2018').toDateString(), 'Asleep', new Date(0, 0, 0, 8, 20), new Date(0, 0, 0, 9, 45) ],
    //   [ new Date('August 23, 2018').toDateString(), 'Awake', new Date(0, 0, 0, 9, 45), new Date(0, 0, 0, 13, 0) ],
    //   [ new Date('August 23, 2018').toDateString(), 'Asleep', new Date(0, 0, 0, 13, 0), new Date(0, 0, 0, 13, 10) ],
    //   [ new Date('August 23, 2018').toDateString(), 'Awake', new Date(0, 0, 0, 13, 10), new Date(0, 0, 0, 15, 15) ],
    //   [ new Date('August 23, 2018').toDateString(), 'Asleep', new Date(0, 0, 0, 15, 15), new Date(0, 0, 0, 16, 30) ],
    //   [ new Date('August 23, 2018').toDateString(), 'Awake', new Date(0, 0, 0, 16, 30), new Date(0, 0, 0, 20, 30) ],
    //   [ new Date('August 23, 2018').toDateString(), 'Asleep', new Date(0, 0, 0, 20, 30), new Date(0, 0, 0, 24, 0) ],

    //   [ new Date('August 24, 2018').toDateString(), 'Asleep', new Date(0, 0, 0, 0, 0), new Date(0, 0, 0, 1, 15) ],
    //   [ new Date('August 24, 2018').toDateString(), 'Awake', new Date(0, 0, 0, 1, 15), new Date(0, 0, 0, 1, 35) ],
    //   [ new Date('August 24, 2018').toDateString(), 'Asleep', new Date(0, 0, 0, 1, 35), new Date(0, 0, 0, 4, 30) ],
    //   [ new Date('August 24, 2018').toDateString(), 'Awake', new Date(0, 0, 0, 4, 30), new Date(0, 0, 0, 4, 50) ],
    //   [ new Date('August 24, 2018').toDateString(), 'Asleep', new Date(0, 0, 0, 4, 50), new Date(0, 0, 0, 7, 15) ],
    //   [ new Date('August 24, 2018').toDateString(), 'Awake', new Date(0, 0, 0, 7, 15), new Date(0, 0, 0, 9, 50) ],
    //   [ new Date('August 24, 2018').toDateString(), 'Asleep', new Date(0, 0, 0, 9, 50), new Date(0, 0, 0, 10, 10) ],
    //   [ new Date('August 24, 2018').toDateString(), 'Awake', new Date(0, 0, 0, 10, 10), new Date(0, 0, 0, 14, 40) ],
    //   [ new Date('August 24, 2018').toDateString(), 'Asleep', new Date(0, 0, 0, 14, 40), new Date(0, 0, 0, 17, 20) ],
    //   [ new Date('August 24, 2018').toDateString(), 'Awake', new Date(0, 0, 0, 17, 20), new Date(0, 0, 0, 20, 45) ],
    //   [ new Date('August 24, 2018').toDateString(), 'Asleep', new Date(0, 0, 0, 20, 45), new Date(0, 0, 0, 23, 50) ],
    //   [ new Date('August 24, 2018').toDateString(), 'Awake', new Date(0, 0, 0, 23, 50), new Date(0, 0, 0, 24, 0) ],

    //   [ new Date(2018, 8, 25).toDateString(), 'Awake', new Date(0, 0, 0, 0, 0), new Date(0, 0, 0, 0, 5) ],
    //   [ new Date(2018, 8, 25).toDateString(), 'Asleep', new Date(0, 0, 0, 0, 5), new Date(0, 0, 0, 1, 45) ],
    //   [ new Date(2018, 8, 25).toDateString(), 'Awake', new Date(0, 0, 0, 1, 45), new Date(0, 0, 0, 2, 0) ],
    //   [ new Date(2018, 8, 25).toDateString(), 'Asleep', new Date(0, 0, 0, 2, 0), new Date(0, 0, 0, 4, 15) ],
    //   [ new Date(2018, 8, 25).toDateString(), 'Awake', new Date(0, 0, 0, 4, 15), new Date(0, 0, 0, 4, 30) ],
    //   [ new Date(2018, 8, 25).toDateString(), 'Asleep', new Date(0, 0, 0, 4, 30), new Date(0, 0, 0, 7, 0) ],
    //   [ new Date(2018, 8, 25).toDateString(), 'Awake', new Date(0, 0, 0, 7, 0), new Date(0, 0, 0, 9, 0) ],
    //   [ new Date(2018, 8, 25).toDateString(), 'Crying', new Date(0, 0, 0, 9, 0), new Date(0, 0, 0, 9, 25) ],
    //   [ new Date(2018, 8, 25).toDateString(), 'Asleep', new Date(0, 0, 0, 9, 25), new Date(0, 0, 0, 10, 40) ],
    //   [ new Date(2018, 8, 25).toDateString(), 'Awake', new Date(0, 0, 0, 10, 40), new Date(0, 0, 0, 13, 35) ],
    //   [ new Date(2018, 8, 25).toDateString(), 'Crying', new Date(0, 0, 0, 13, 35), new Date(0, 0, 0, 14, 0) ],
    //   [ new Date(2018, 8, 25).toDateString(), 'Asleep', new Date(0, 0, 0, 14, 0), new Date(0, 0, 0, 16, 15) ],
    //   [ new Date(2018, 8, 25).toDateString(), 'Awake', new Date(0, 0, 0, 16, 15), new Date(0, 0, 0, 20, 15) ],
    //   [ new Date(2018, 8, 25).toDateString(), 'Asleep', new Date(0, 0, 0, 20, 15), new Date(0, 0, 0, 24, 0) ],

    //   [ new Date(2018, 8, 26).toDateString(), 'Asleep', new Date(0, 0, 0, 0, 0), new Date(0, 0, 0, 1, 40) ],
    //   [ new Date(2018, 8, 26).toDateString(), 'Awake', new Date(0, 0, 0, 1, 40), new Date(0, 0, 0, 2, 0) ],
    //   [ new Date(2018, 8, 26).toDateString(), 'Asleep', new Date(0, 0, 0, 2, 0), new Date(0, 0, 0, 5, 0) ],
    //   [ new Date(2018, 8, 26).toDateString(), 'Awake', new Date(0, 0, 0, 5, 0), new Date(0, 0, 0, 5, 40) ],
    //   [ new Date(2018, 8, 26).toDateString(), 'Asleep', new Date(0, 0, 0, 5, 40), new Date(0, 0, 0, 7, 30) ],
    //   [ new Date(2018, 8, 26).toDateString(), 'Awake', new Date(0, 0, 0, 7, 30), new Date(0, 0, 0, 9, 40) ],
    //   [ new Date(2018, 8, 26).toDateString(), 'Crying', new Date(0, 0, 0, 9, 40), new Date(0, 0, 0, 9, 45) ],
    //   [ new Date(2018, 8, 26).toDateString(), 'Asleep', new Date(0, 0, 0, 9, 45), new Date(0, 0, 0, 11, 40) ],
    //   [ new Date(2018, 8, 26).toDateString(), 'Awake', new Date(0, 0, 0, 11, 40), new Date(0, 0, 0, 2, 05) ],
    //   [ new Date(2018, 8, 26).toDateString(), 'Crying', new Date(0, 0, 0, 2, 05), new Date(0, 0, 0, 2, 15) ],
    //   [ new Date(2018, 8, 26).toDateString(), 'Asleep', new Date(0, 0, 0, 2, 15), new Date(0, 0, 0, 3, 35) ],
    //   [ new Date(2018, 8, 26).toDateString(), 'Awake', new Date(0, 0, 0, 3, 35), new Date(0, 0, 0, 8, 0) ],
    //   [ new Date(2018, 8, 26).toDateString(), 'Crying', new Date(0, 0, 0, 8, 0), new Date(0, 0, 0, 8, 15) ],
    //   [ new Date(2018, 8, 26).toDateString(), 'Asleep', new Date(0, 0, 0, 8, 15), new Date(0, 0, 0, 8, 15) ],
    // 1:40 - 2:00 - 4:00 - 4:15 - 7:15 - 9:05

    // ];
  }
}
