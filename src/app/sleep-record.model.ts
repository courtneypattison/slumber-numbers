import { SleepState } from './sleep-state.model';

export interface SleepRecord {
  startDateTime: Date;
  sleepState: SleepState;
}
