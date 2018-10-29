import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { SleepTimeModule } from './sleep-time/sleep-time.module';

const appRoutes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    AccountModule,
    AuthModule,
    SleepTimeModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
