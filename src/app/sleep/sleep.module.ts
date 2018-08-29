import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SleepService } from './shared/sleep.service';
import { SleepComponent } from './sleep.component';
import { SleepChartComponent } from './sleep-chart/sleep-chart.component';
import { SleepRoutingModule } from './sleep-routing-module';

@NgModule({
  imports: [
    CommonModule,
    SleepRoutingModule
  ],
  providers: [SleepService],
  declarations: [
    SleepComponent,
    SleepChartComponent
  ]
})
export class SleepModule { }
