import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import * as firebase from 'firebase/app';

import { SleepState } from '../shared/sleep-state.model';
import { SleepService } from '../shared/sleep.service';

@Component({
  selector: 'sl-sleep-form',
  templateUrl: './sleep-form.component.html',
  styleUrls: ['./sleep-form.component.css']
})
export class SleepFormComponent implements OnInit {
  datePipe = new DatePipe(navigator.language);
  sleepForm = this.formBuilder.group({
    startDate: [new Date(), Validators.required],
    startTime: [this.datePipe.transform(new Date(), 'shortTime'), [
      Validators.required,
      Validators.pattern('(1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm])')
    ]],
    sleepState: ['', Validators.required]
  });

  sleepStates = Object.values(SleepState).filter(value => typeof value === 'string') as string[];

  constructor(private formBuilder: FormBuilder, private sleepService: SleepService) { }

  ngOnInit() {
  }

  private getStartHours(): number {
    const numbers = this.sleepForm.value.startTime.split(':');
    // Convert to 24 hour clock
    return numbers[1].includes('P') || numbers[1].includes('p') ? Number(numbers[0]) + 12 : Number(numbers[0]);
  }

  private getStartMinutes(): number {
    const startTime = this.sleepForm.value.startTime;
    const colonIndex = startTime.search(':');
    return Number(startTime.slice(colonIndex + 1, -3));
  }

  private getStartDateTime(): Date {
    const startDate = new Date(this.sleepForm.value.startDate);
    return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), this.getStartHours(), this.getStartMinutes());
  }

  onSave() {
    this.sleepService.add(this.getStartDateTime(), this.sleepForm.value.sleepState);
  }

}
