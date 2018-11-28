import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { State } from 'app/sleep-time/shared/state.model';
import { SleepTimeService } from 'app/sleep-time/shared/sleep-time.service';

@Component({
  selector: 'sn-sleep-time-form',
  templateUrl: './sleep-time-form.component.html',
  styleUrls: ['./sleep-time-form.component.css']
})
export class SleepTimeFormComponent {
  datePipe = new DatePipe(navigator.language);
  currentDate = new Date();
  sleepTimeForm = this.formBuilder.group({
    startDate: [this.currentDate, Validators.required],
    hour: [this.datePipe.transform(this.currentDate, 'h'), Validators.required],
    minute: [this.datePipe.transform(this.currentDate, 'm'), Validators.required],
    period: [this.datePipe.transform(this.currentDate, 'a'), Validators.required],
    state: ['', Validators.required]
  });

  states = Object.values(State).filter(value => typeof value === 'string') as string[];
  hours = getNumbers(1, 12);
  minutes = getNumbers(0, 59);
  periods = ['AM', 'PM'];

  constructor(private formBuilder: FormBuilder, private sleepService: SleepTimeService) { }

  private getStartHour(): number {
    const hour = this.sleepTimeForm.value.hour;
    const period = this.sleepTimeForm.value.period;

    // Convert to 24 hour clock
    if (period === 'PM') {
      return (hour === 12) ? 12 : hour + 12;
    } else {
      return (hour === 12) ? 0 : hour;
    }
  }

  private getStartDateTime(): Date {
    const startDate = new Date(this.sleepTimeForm.value.startDate);
    const minute = this.sleepTimeForm.value.minute;

    return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), this.getStartHour(), minute);
  }

  onSetSleepTime() {
    const state = this.sleepTimeForm.value.state;

    this.sleepService.setSleepTime(this.getStartDateTime(), state);
  }

}

function getNumbers(start: number, end: number): number[] {
  return Array.from(Array(end).keys()).map((value) => value + start);
}
