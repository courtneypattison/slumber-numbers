import { firestore } from 'firebase/app';
import { SleepState } from '../app/sleep-time/shared/sleep-state.model';

export const StubSleepTimes = [
  { startTimestamp: firestore.Timestamp.fromDate(new Date(2018, 4, 25, 1, 25)), sleepState: SleepState.Crying },
  { startTimestamp: firestore.Timestamp.fromDate(new Date(2018, 4, 25, 2, 25)), sleepState: SleepState.Asleep },
  { startTimestamp: firestore.Timestamp.fromDate(new Date(2018, 4, 26, 2, 25)) , sleepState: SleepState.Awake },
  { startTimestamp: firestore.Timestamp.fromDate(new Date(2018, 4, 26, 2, 30)), sleepState: SleepState.Unknown },
  { startTimestamp: firestore.Timestamp.fromDate(new Date(2018, 4, 26, 2, 40)), sleepState: SleepState.Unknown },
  { startTimestamp: firestore.Timestamp.fromDate(new Date(2018, 4, 29, 4, 30)), sleepState: SleepState.Asleep },
  { startTimestamp: firestore.Timestamp.fromDate(new Date(2018, 5, 2, 2, 30)), sleepState: SleepState.Unknown },
];
