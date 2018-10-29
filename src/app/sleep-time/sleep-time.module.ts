import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../shared/shared.module';
import { SleepTimeChartComponent } from './sleep-time-chart/sleep-time-chart.component';
import { SleepTimeComponent } from './sleep-time.component';
import { SleepTimeFormComponent } from './sleep-time-form/sleep-time-form.component';
import { SleepTimeService } from './shared/sleep-time.service';
import { SleepTimeTableComponent } from './sleep-time-table/sleep-time-table.component';
import { SleepTimeRoutingModule } from './sleep-time-routing.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
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
