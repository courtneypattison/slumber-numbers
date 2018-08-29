import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SleepComponent } from './sleep.component';
import { SleepChartComponent } from './sleep-chart/sleep-chart.component';

const routes = [
    { path: '',
    component: SleepComponent,
    children: [
      { path: '', component: SleepChartComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SleepRoutingModule {

}
