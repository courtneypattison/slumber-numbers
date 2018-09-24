import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SleepTimeComponent } from './sleep-time.component';
import { SleepTimeChartComponent } from './sleep-time-chart/sleep-time-chart.component';

const sleepTimeRoutes = [
    { path: 'dashboard',
    component: SleepTimeComponent,
    children: [
      { path: 'sleepchart', component: SleepTimeChartComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(sleepTimeRoutes)],
  exports: [RouterModule]
})
export class SleepTimeRoutingModule {

}
