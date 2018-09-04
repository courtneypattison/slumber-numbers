import * as firebase from 'firebase';
import { SleepState } from './sleep-state.model';

export interface SleepRecord {
  startTimestamp: firebase.firestore.Timestamp;
  sleepState: SleepState;
}
