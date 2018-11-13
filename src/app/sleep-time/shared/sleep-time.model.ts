import * as firebase from 'firebase/app';

import { State } from 'app/sleep-time/shared/state.model';

export interface SleepTime {
  startTimestamp: firebase.firestore.Timestamp;
  state: State;
}
