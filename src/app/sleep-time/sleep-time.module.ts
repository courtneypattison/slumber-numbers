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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { SharedModule } from '../shared/shared.module';

import { SleepTimeService } from './shared/sleep-time.service';
import { SleepTimeComponent } from './sleep-time.component';
import { SleepTimeChartComponent } from './sleep-time-chart/sleep-time-chart.component';
import { SleepTimeRoutingModule } from './sleep-time-routing.module';
import { SleepTimeFormComponent } from './sleep-time-form/sleep-time-form.component';
import { SleepTimeTableComponent } from './sleep-time-table/sleep-time-table.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatNativeDateModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    SleepTimeRoutingModule
  ],
  providers: [SleepTimeService],
  declarations: [
    SleepTimeComponent,
    SleepTimeChartComponent,
    SleepTimeFormComponent,
    SleepTimeTableComponent
  ]
})
export class SleepTimeModule { }
