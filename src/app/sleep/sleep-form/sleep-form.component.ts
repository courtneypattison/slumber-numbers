import { Component, OnInit } from '@angular/core';

import { SleepState } from '../shared/sleep-state.model';

@Component({
  selector: 'sl-sleep-form',
  templateUrl: './sleep-form.component.html',
  styleUrls: ['./sleep-form.component.css']
})
export class SleepFormComponent implements OnInit {
  startDate = new Date();
  startTime = new Date();
  startSleepState = SleepState.Asleep.toString();

  sleepStates = Object.values(SleepState).filter(value => typeof value === 'string') as string[];

  constructor() { }

  ngOnInit() {
  }

  picker() {

  }

}
