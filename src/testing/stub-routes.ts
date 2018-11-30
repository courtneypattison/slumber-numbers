import { Routes } from '@angular/router';

import { AccountComponent } from 'app/account/account.component';
import { PageNotFoundComponent } from 'app/core/page-not-found/page-not-found.component';
import { SleepTimeComponent } from 'app/sleep-time/sleep-time.component';

export const StubRoutes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'dashboard', component: SleepTimeComponent },
  { path: 'account', component: AccountComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];
