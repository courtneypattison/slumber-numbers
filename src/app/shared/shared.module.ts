import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';

import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { TimestampPipe } from './timestamp.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  declarations: [TimestampPipe, ErrorDialogComponent],
  exports: [
    CommonModule,
    TimestampPipe
  ]
})
export class SharedModule { }
