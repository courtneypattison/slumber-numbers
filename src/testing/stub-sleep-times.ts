import { firestore } from 'firebase/app';
import { State } from 'app/sleep-time/shared/state.model';

export const StubSleepTimes = [
  { startTimestamp: firestore.Timestamp.fromDate(new Date(2018, 4, 25, 1, 25)), state: State.Fussing },
  { startTimestamp: firestore.Timestamp.fromDate(new Date(2018, 4, 25, 2, 25)), state: State.Asleep },
  { startTimestamp: firestore.Timestamp.fromDate(new Date(2018, 4, 26, 2, 25)) , state: State.Awake },
  { startTimestamp: firestore.Timestamp.fromDate(new Date(2018, 4, 26, 2, 30)), state: State.Unknown },
  { startTimestamp: firestore.Timestamp.fromDate(new Date(2018, 4, 26, 2, 40)), state: State.Unknown },
  { startTimestamp: firestore.Timestamp.fromDate(new Date(2018, 4, 29, 4, 30)), state: State.Asleep },
  { startTimestamp: firestore.Timestamp.fromDate(new Date(2018, 5, 2, 2, 30)), state: State.Unknown },
];
