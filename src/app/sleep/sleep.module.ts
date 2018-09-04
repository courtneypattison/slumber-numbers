import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SleepService } from './shared/sleep.service';
import { SleepComponent } from './sleep.component';
import { SleepChartComponent } from './sleep-chart/sleep-chart.component';
import { SleepRoutingModule } from './sleep-routing-module';
import { SleepFormComponent } from './sleep-form/sleep-form.component';

@NgModule({
  imports: [
    CommonModule,
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
