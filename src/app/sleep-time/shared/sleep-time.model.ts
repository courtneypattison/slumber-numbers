import * as firebase from 'firebase/app';

import { SleepState } from 'app/sleep-time/shared/sleep-state.model';

export interface SleepTime {
  startTimestamp: firebase.firestore.Timestamp;
  sleepState: SleepState;
}
