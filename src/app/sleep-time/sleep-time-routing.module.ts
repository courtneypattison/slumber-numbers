import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SleepTimeComponent } from './sleep-time.component';

import { AuthGuardService } from '../auth/shared/auth-guard.service';

const sleepTimeRoutes = [
    { path: 'dashboard', component: SleepTimeComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(sleepTimeRoutes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class SleepTimeRoutingModule {

}
