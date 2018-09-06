import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { SleepState } from '../shared/sleep-state.model';

@Component({
  selector: 'sl-sleep-form',
  templateUrl: './sleep-form.component.html',
  styleUrls: ['./sleep-form.component.css']
})
export class SleepFormComponent implements OnInit {
  datePipe = new DatePipe(navigator.language);
  sleepForm = this.formBuilder.group({
    startDate: [this.datePipe.transform(new Date(), 'y-MM-dd'), Validators.required],
    startTime: [this.datePipe.transform(new Date(), 'shortTime'), Validators.required],
    startSleepState: [SleepState.Asleep.toString(), Validators.required]
  });

  sleepStates = Object.values(SleepState).filter(value => typeof value === 'string') as string[];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.sleepForm.value);
  }

}
