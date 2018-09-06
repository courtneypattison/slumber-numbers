import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatNativeDateModule } from '@angular/material/';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

import { SleepService } from './shared/sleep.service';
import { SleepComponent } from './sleep.component';
import { SleepChartComponent } from './sleep-chart/sleep-chart.component';
import { SleepRoutingModule } from './sleep-routing-module';
import { SleepFormComponent } from './sleep-form/sleep-form.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    SleepRoutingModule
  ],
  providers: [SleepService],
  declarations: [
    SleepComponent,
    SleepChartComponent,
    SleepFormComponent
  ]
})
export class SleepModule { }
