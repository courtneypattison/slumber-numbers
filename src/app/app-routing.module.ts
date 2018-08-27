import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SleepModule } from './sleep/sleep.module';

import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'sleepchart', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    SleepModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
