import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountModule } from 'app/account/account.module';
import { AuthModule } from 'app/auth/auth.module';
import { PageNotFoundComponent } from 'app/core/page-not-found/page-not-found.component';
import { SleepTimeModule } from 'app/sleep-time/sleep-time.module';

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
