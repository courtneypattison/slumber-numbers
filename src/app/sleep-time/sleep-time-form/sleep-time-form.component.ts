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
  hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  minutes = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
    '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
    '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
    '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
    '40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
    '50', '51', '52', '53', '54', '55', '56', '57', '58', '59',
  ];
  periods = ['AM', 'PM'];

  constructor(private formBuilder: FormBuilder, private sleepService: SleepTimeService) { }

  private getStartHour(): number {
    const hour = Number(this.sleepTimeForm.value.hour);
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
    const minute = Number(this.sleepTimeForm.value.minute);

    return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), this.getStartHour(), minute);
  }

  onSetSleepTime() {
    const state = this.sleepTimeForm.value.state;

    this.sleepService.setSleepTime(this.getStartDateTime(), state);
  }

}
