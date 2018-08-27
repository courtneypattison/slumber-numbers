import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SleepService } from './shared/sleep.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [SleepService],
  declarations: []
})
export class SleepModule { }
