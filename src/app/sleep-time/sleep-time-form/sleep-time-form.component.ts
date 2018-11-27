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
  sleepTimeForm = this.formBuilder.group({
    startDate: [new Date(), Validators.required],
    startTime: [this.datePipe.transform(new Date(), 'shortTime'), [
      Validators.required,
      Validators.pattern('(1[0-2]|0?[1-9]):([0-5][0-9]) *([AaPp][Mm])')
    ]],
    state: ['', Validators.required]
  });

  states = Object.values(State).filter(value => typeof value === 'string') as string[];

  constructor(private formBuilder: FormBuilder, private sleepService: SleepTimeService) { }

  private getStartHours(): number {
    const startTime = this.sleepTimeForm.value.startTime;
    const hours = Number(this.sleepTimeForm.value.startTime.split(':')[0]);

    // Convert to 24 hour clock
    if (startTime.search(/P/i) !== -1) { // PM
      return (hours === 12) ? 12 : hours + 12;
    } else { // AM
      return (hours === 12) ? 0 : hours;
    }
  }

  private getStartMinutes(): number {
    const startTime = this.sleepTimeForm.value.startTime;
    const colonIndex = startTime.search(':');

    return Number(startTime.slice(colonIndex + 1, -3));
  }

  private getStartDateTime(): Date {
    const startDate = new Date(this.sleepTimeForm.value.startDate);

    return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), this.getStartHours(), this.getStartMinutes());
  }

  onSetSleepTime() {
    this.sleepService.setSleepTime(this.getStartDateTime(), this.sleepTimeForm.value.state);
  }

}
