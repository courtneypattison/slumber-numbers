import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimestampPipe } from './timestamp.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TimestampPipe],
  exports: [
    CommonModule,
    TimestampPipe
  ]
})
export class SharedModule { }
