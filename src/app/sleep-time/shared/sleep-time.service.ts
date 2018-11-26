import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { firestore, User } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { catchError, flatMap, tap } from 'rxjs/operators';

import { AuthService } from 'app/auth/shared/auth.service';
import { LoggerService } from 'app/core/logger.service';
import { State } from 'app/sleep-time/shared/state.model';
import { SleepTime } from 'app/sleep-time/shared/sleep-time.model';
import { SleepTimeChartRow } from 'app/sleep-time/shared/sleep-time-chart-row.model';

@Injectable({
  providedIn: 'root'
})
export class SleepTimeService {

  constructor(private angularFirestore: AngularFirestore, public authService: AuthService, private loggerService: LoggerService) { }

  private getSleepTimesPath(uid: string): string {
    return `accounts/${uid}/sleepTimes`;
  }

  setSleepTime(startDateTime: Date, state: State): Promise<void> {
    this.loggerService.log(`setSleepTime(startDateTime: ${startDateTime}, state: ${state})`);

    return this.authService
      .getCurrentUser()
      .then((currentUser: User) => {
        const startTimestamp = firestore.Timestamp.fromDate(startDateTime);

        return this.loggerService.logPromise(
          'Set sleep time in firestore',
          'Failed to set sleep time in firestore',
          this.angularFirestore
            .collection<SleepTime>(this.getSleepTimesPath(currentUser.uid))
            .doc(String(startTimestamp))
            .set({ startTimestamp: startTimestamp, state: state })
        );
      });
  }

  deleteSleepTime(sleepTimeId: string): Promise<void> {
    this.loggerService.log(`deleteSleepTime(sleepTimeId: ${sleepTimeId})`);

    return this.authService
      .getCurrentUser()
      .then((currentUser: User) => {
        return this.loggerService.logPromise(
          'Deleted sleep time from firestore',
          'Failed to delete sleep time from firestore',
          this.angularFirestore
            .doc<SleepTime>(`${this.getSleepTimesPath(currentUser.uid)}/${sleepTimeId}`)
            .delete()
        );
      });
  }

  deleteAllSleepTimes(): Promise<void> {
    this.loggerService.log(`deleteAllSleepTimes()`);

    return new Promise((resolve, reject) => {
      this.getSleepTimes().subscribe((sleepTimes: SleepTime[]) => {
        for (let i = 0; i < sleepTimes.length; i++) {
          this.deleteSleepTime(String(sleepTimes[i].startTimestamp))
            .then(() => {
              if (i === sleepTimes.length - 1) {
                this.loggerService.log(`Deleted all sleep times from firestore`);

                resolve();
              }
            })
            .catch((error) => reject(error));
        }
        if (sleepTimes.length === 0) {
          this.loggerService.log(`There are no sleep times to delete from firestore`);

          resolve();
        }
      });
    });
  }

  downloadCSV() {
  }

  getSleepTimes(): Observable<SleepTime[]> {
    this.loggerService.log('getSleepTimes()');

    return this.authService
      .getCurrentUserState()
      .pipe(
        flatMap((currentUser: User) => {
          const sleepTimesPath = this.getSleepTimesPath(currentUser.uid);

          return this.angularFirestore
            .collection<SleepTime>(sleepTimesPath, ref => ref.orderBy('startTimestamp'))
            .valueChanges()
            .pipe(
              tap(() => {
                this.loggerService.log(`Got sleep times from firestore:
                    sleepTimesPath: ${sleepTimesPath}`);
              }),
              catchError((error: firestore.FirestoreError) => {
                this.loggerService.error(`Couldn't get sleep times from firestore:
                    error.message: ${error.message ? error.message : error.code}`);
                return of([]);
              })
            );
        }),
        catchError(() => {
          return of([]);
        }),
      );
  }

  getSleepChartRows(sleepTimes: SleepTime[]): SleepTimeChartRow[] {
    this.loggerService.log('getSleepChartRows(sleepTimes)');

    const sleepChartRows: SleepTimeChartRow[] = [];
    const endTimeIndex = 3;
    const datePipe = new DatePipe(navigator.language);

    for (let i = 0, j = 0; i < sleepTimes.length; i++ , j++) {
      const currState = sleepTimes[i].state;
      const currStartDateTime = sleepTimes[i].startTimestamp.toDate();
      const currStartTime = new Date(0, 0, 0, currStartDateTime.getHours(), currStartDateTime.getMinutes());

      if (i > 0 && sleepTimes[i - 1].state !== State.Unknown) {
        const prevStartTime = sleepTimes[i - 1].startTimestamp.toDate();
        const prevState = sleepTimes[i - 1].state;

        if (prevStartTime.toDateString() === currStartDateTime.toDateString()) { // Same day
            sleepChartRows[j - 1][endTimeIndex] = currStartTime;
        } else { // New day
            sleepChartRows[j - 1][endTimeIndex] = new Date(0, 0, 0, 24, 0);
            sleepChartRows.push([
              datePipe.transform(currStartDateTime, 'M/d'),
              prevState,
              new Date(0, 0, 0, 0, 0),
              currStartTime
            ]);
            j++;
        }
      }

      if (currState === State.Unknown) {
        j--;
      } else {
        sleepChartRows.push([
          datePipe.transform(currStartDateTime, 'M/d'),
          currState,
          currStartTime,
          new Date(currStartTime.valueOf() + 1000)
        ]);
      }
    }

    return sleepChartRows;
  }
}
