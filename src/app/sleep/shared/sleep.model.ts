import * as firebase from 'firebase/app';

import { SleepState } from './sleep-state.model';

export interface Sleep {
  startTimestamp: firebase.firestore.Timestamp;
  sleepState: SleepState;
}
