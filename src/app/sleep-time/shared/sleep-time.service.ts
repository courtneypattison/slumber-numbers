import { Injectable } from '@angular/core';

import { User, firestore } from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { SleepTimeChartRow } from './sleep-time-chart-row.model';
import { SleepTime } from './sleep-time.model';
import { SleepState } from './sleep-state.model';

import { LoggerService } from '../../core/logger.service';

@Injectable({
  providedIn: 'root'
})
export class SleepTimeService {

  constructor(private angularFirestore: AngularFirestore, public angularFireAuth: AngularFireAuth, private logger: LoggerService) { }

  add(startDateTime: Date, sleepState: SleepState) {
    this.angularFireAuth.authState.pipe(first()).subscribe((user: User) => {
      this.logger.log(`Add sleep to firestore:
        user.uid: ${user.uid},
        startDateTime: ${startDateTime.toDateString()} ${startDateTime.toTimeString()},
        state: ${sleepState}`);
      const startTimestamp = firestore.Timestamp.fromDate(startDateTime);

      this.angularFirestore
        .collection<SleepTime>(user.uid)
        .doc(String(startTimestamp))
        .set({
          startTimestamp: startTimestamp,
          sleepState: sleepState
        });
    });
  }

  getSleepChartRows(sleepLog: SleepTime[]): SleepTimeChartRow[] {
    this.logger.log('Get sleep chart rows');

    const sleepChartRows: SleepTimeChartRow[] = [];
    const endTimeIndex = 3;
    for (let i = 0, j = 0; i < sleepLog.length; i++ , j++) {
      const currStartDateTime = sleepLog[i].startTimestamp.toDate();
      const currStartTime = new Date(0, 0, 0, currStartDateTime.getHours(), currStartDateTime.getMinutes());

      if (i > 0) {
        const prevStartTimestamp = sleepLog[i - 1].startTimestamp.toDate();

        if (prevStartTimestamp.toDateString() === currStartDateTime.toDateString()) { // Same day
          sleepChartRows[j - 1][endTimeIndex] = currStartTime;
        } else { // New day
          sleepChartRows[j - 1][endTimeIndex] = new Date(0, 0, 0, 24, 0);
          sleepChartRows.push([
            currStartDateTime.toDateString(),
            sleepLog[i - 1].sleepState,
            new Date(0, 0, 0, 0, 0),
            currStartTime
          ]);
          j++;
        }
      }

      sleepChartRows.push([
        currStartDateTime.toDateString(),
        sleepLog[i].sleepState,
        currStartTime,
        currStartTime
      ]);
    }

    // Sleep chart must have a width
    if (sleepChartRows.length === 1) {
      sleepChartRows[0][endTimeIndex] = new Date(sleepChartRows[0][endTimeIndex].valueOf() + 1000);
    }

    return sleepChartRows;
  }

  getSleepTimes(uid: string): Observable<SleepTime[]> {
    this.logger.log(`Get sleep log from firestore (uid: ${uid})`);
    return this.angularFirestore
      .collection<SleepTime>(uid, ref => ref.orderBy('startTimestamp'))
      .valueChanges();
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

    this.add(new Date(2018, 7, 30, 3, 10), SleepState.Awake);
    this.add(new Date(2018, 7, 30, 3, 30), SleepState.Asleep);
    this.add(new Date(2018, 7, 30, 7, 0), SleepState.Awake);
    this.add(new Date(2018, 7, 30, 8, 45), SleepState.Crying);
    this.add(new Date(2018, 7, 30, 8, 50), SleepState.Asleep);
    this.add(new Date(2018, 7, 30, 9, 30), SleepState.Awake);
    this.add(new Date(2018, 7, 30, 11, 25), SleepState.Asleep);
    this.add(new Date(2018, 7, 30, 13, 10), SleepState.Awake);
    this.add(new Date(2018, 7, 30, 15, 10), SleepState.Crying);
    this.add(new Date(2018, 7, 30, 15, 15), SleepState.Asleep);
    this.add(new Date(2018, 7, 30, 23, 50), SleepState.Awake);

    this.add(new Date(2018, 7, 31, 0, 20), SleepState.Asleep);
    this.add(new Date(2018, 7, 31, 5, 5), SleepState.Awake);
    this.add(new Date(2018, 7, 31, 5, 25), SleepState.Asleep);
    this.add(new Date(2018, 7, 31, 7, 15), SleepState.Awake);
    this.add(new Date(2018, 7, 31, 9, 15), SleepState.Crying);
    this.add(new Date(2018, 7, 31, 9, 25), SleepState.Asleep);
    this.add(new Date(2018, 7, 31, 10, 50), SleepState.Awake);
    this.add(new Date(2018, 7, 31, 13, 15), SleepState.Crying);
    this.add(new Date(2018, 7, 31, 13, 45), SleepState.Awake);
    this.add(new Date(2018, 7, 31, 14, 25), SleepState.Crying);
    this.add(new Date(2018, 7, 31, 14, 35), SleepState.Asleep);
    this.add(new Date(2018, 7, 31, 15, 55), SleepState.Awake);
    this.add(new Date(2018, 7, 31, 19, 10), SleepState.Crying);
    this.add(new Date(2018, 7, 31, 19, 20), SleepState.Asleep);
    this.add(new Date(2018, 7, 31, 21, 15), SleepState.Awake);
    this.add(new Date(2018, 7, 31, 21, 35), SleepState.Asleep);

    this.add(new Date(2018, 8, 1, 1, 15), SleepState.Awake);
    this.add(new Date(2018, 8, 1, 1, 45), SleepState.Asleep);
    this.add(new Date(2018, 8, 1, 5, 45), SleepState.Awake);
    this.add(new Date(2018, 8, 1, 7, 40), SleepState.Crying);
    this.add(new Date(2018, 8, 1, 7, 50), SleepState.Asleep);
    this.add(new Date(2018, 8, 1, 8, 25), SleepState.Awake);
    this.add(new Date(2018, 8, 1, 9, 55), SleepState.Crying);
    this.add(new Date(2018, 8, 1, 10, 5), SleepState.Asleep);
    this.add(new Date(2018, 8, 1, 11, 30), SleepState.Awake);
    this.add(new Date(2018, 8, 1, 14, 10), SleepState.Crying);
    this.add(new Date(2018, 8, 1, 14, 15), SleepState.Asleep);
    this.add(new Date(2018, 8, 1, 16, 55), SleepState.Awake);
    this.add(new Date(2018, 8, 1, 19, 25), SleepState.Asleep);
    this.add(new Date(2018, 8, 1, 23, 40), SleepState.Awake);
    this.add(new Date(2018, 8, 1, 24, 0), SleepState.Asleep);

    this.add(new Date(2018, 8, 2, 6, 0), SleepState.Awake);
    this.add(new Date(2018, 8, 2, 7, 55), SleepState.Crying);
    this.add(new Date(2018, 8, 2, 8, 5), SleepState.Asleep);
    this.add(new Date(2018, 8, 2, 9, 25), SleepState.Awake);
    this.add(new Date(2018, 8, 2, 11, 30), SleepState.Crying);
    this.add(new Date(2018, 8, 2, 11, 35), SleepState.Asleep);
    this.add(new Date(2018, 8, 2, 13, 0), SleepState.Awake);
    this.add(new Date(2018, 8, 2, 15, 10), SleepState.Asleep);
    this.add(new Date(2018, 8, 2, 16, 10), SleepState.Awake);
    this.add(new Date(2018, 8, 2, 19, 0), SleepState.Crying);
    this.add(new Date(2018, 8, 2, 19, 10), SleepState.Asleep);

    this.add(new Date(2018, 8, 3, 1, 10), SleepState.Awake);
    this.add(new Date(2018, 8, 3, 1, 30), SleepState.Asleep);
    this.add(new Date(2018, 8, 3, 5, 0), SleepState.Awake);
    this.add(new Date(2018, 8, 3, 5, 30), SleepState.Asleep);
    this.add(new Date(2018, 8, 3, 6, 40), SleepState.Awake);
    this.add(new Date(2018, 8, 3, 8, 40), SleepState.Crying);
    this.add(new Date(2018, 8, 3, 8, 45), SleepState.Asleep);
    this.add(new Date(2018, 8, 3, 10, 0), SleepState.Awake);
    this.add(new Date(2018, 8, 3, 11, 50), SleepState.Crying);
    this.add(new Date(2018, 8, 3, 11, 55), SleepState.Asleep);
    this.add(new Date(2018, 8, 3, 13, 20), SleepState.Awake);
    this.add(new Date(2018, 8, 3, 15, 5), SleepState.Crying);
    this.add(new Date(2018, 8, 3, 15, 25), SleepState.Asleep);
    this.add(new Date(2018, 8, 3, 16, 5), SleepState.Awake);
    this.add(new Date(2018, 8, 3, 19, 10), SleepState.Crying);
    this.add(new Date(2018, 8, 3, 19, 15), SleepState.Asleep);

    this.add(new Date(2018, 8, 4, 1, 15), SleepState.Awake);
    this.add(new Date(2018, 8, 4, 1, 35), SleepState.Asleep);
    this.add(new Date(2018, 8, 4, 5, 0), SleepState.Awake);
    this.add(new Date(2018, 8, 4, 5, 40), SleepState.Asleep);
    this.add(new Date(2018, 8, 4, 6, 40), SleepState.Awake);
    this.add(new Date(2018, 8, 4, 8, 30), SleepState.Crying);
    this.add(new Date(2018, 8, 4, 8, 35), SleepState.Asleep);
    this.add(new Date(2018, 8, 4, 10, 10), SleepState.Awake);
    this.add(new Date(2018, 8, 4, 12, 0), SleepState.Asleep);
    this.add(new Date(2018, 8, 4, 12, 30), SleepState.Awake);
    this.add(new Date(2018, 8, 4, 14, 30), SleepState.Asleep);
    this.add(new Date(2018, 8, 4, 16, 5), SleepState.Awake);
    this.add(new Date(2018, 8, 4, 19, 5), SleepState.Asleep);

    this.add(new Date(2018, 8, 5, 3, 15), SleepState.Awake);
    this.add(new Date(2018, 8, 5, 3, 45), SleepState.Asleep);
    this.add(new Date(2018, 8, 5, 5, 30), SleepState.Awake);
    this.add(new Date(2018, 8, 5, 7, 30), SleepState.Asleep);
    this.add(new Date(2018, 8, 5, 8, 15), SleepState.Awake);
    this.add(new Date(2018, 8, 5, 9, 40), SleepState.Asleep);
    this.add(new Date(2018, 8, 5, 10, 40), SleepState.Awake);
    this.add(new Date(2018, 8, 5, 13, 30), SleepState.Crying);
    this.add(new Date(2018, 8, 5, 13, 45), SleepState.Asleep);
    this.add(new Date(2018, 8, 5, 15, 25), SleepState.Awake);
    this.add(new Date(2018, 8, 5, 19, 0), SleepState.Asleep);

    this.add(new Date(2018, 8, 6, 4, 0), SleepState.Awake);
    this.add(new Date(2018, 8, 6, 4, 20), SleepState.Asleep);
    this.add(new Date(2018, 8, 6, 6, 30), SleepState.Awake);
    this.add(new Date(2018, 8, 6, 8, 20), SleepState.Asleep);
    this.add(new Date(2018, 8, 6, 9, 35), SleepState.Awake);
    this.add(new Date(2018, 8, 6, 11, 50), SleepState.Asleep);
    this.add(new Date(2018, 8, 6, 13, 5), SleepState.Awake);
    this.add(new Date(2018, 8, 6, 14, 45), SleepState.Crying);
    this.add(new Date(2018, 8, 6, 15, 0), SleepState.Asleep);
    this.add(new Date(2018, 8, 6, 15, 30), SleepState.Awake);
    this.add(new Date(2018, 8, 6, 19, 0), SleepState.Asleep);
    this.add(new Date(2018, 8, 6, 23, 15), SleepState.Awake);
    this.add(new Date(2018, 8, 6, 23, 35), SleepState.Asleep);

    this.add(new Date(2018, 8, 7, 1, 30), SleepState.Awake);
    this.add(new Date(2018, 8, 7, 3, 30), SleepState.Asleep);
    this.add(new Date(2018, 8, 7, 4, 30), SleepState.Awake);
    this.add(new Date(2018, 8, 7, 5, 0), SleepState.Asleep);
    this.add(new Date(2018, 8, 7, 6, 30), SleepState.Awake);
    this.add(new Date(2018, 8, 7, 8, 35), SleepState.Crying);
    this.add(new Date(2018, 8, 7, 8, 40), SleepState.Asleep);
    this.add(new Date(2018, 8, 7, 9, 30), SleepState.Awake);
    this.add(new Date(2018, 8, 7, 11, 20), SleepState.Crying);
    this.add(new Date(2018, 8, 7, 11, 30), SleepState.Awake);
    this.add(new Date(2018, 8, 7, 12, 45), SleepState.Asleep);
  }
}
