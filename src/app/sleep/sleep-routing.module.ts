import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SleepComponent } from './sleep.component';
import { SleepChartComponent } from './sleep-chart/sleep-chart.component';

const sleepRoutes = [
    { path: 'sleep',
    component: SleepComponent,
    children: [
      { path: 'sleepchart', component: SleepChartComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(sleepRoutes)],
  exports: [RouterModule]
})
export class SleepRoutingModule {

}
