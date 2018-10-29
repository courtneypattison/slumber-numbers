import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuardService } from '../auth/shared/auth-guard.service';
import { SleepTimeComponent } from './sleep-time.component';

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
