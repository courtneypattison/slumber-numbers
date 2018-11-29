import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';

import { ErrorDialogComponent } from 'app/shared/error-dialog/error-dialog.component';
import { TimePipe } from 'app/shared/time.pipe';
import { TimestampPipe } from 'app/shared/timestamp.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  declarations: [
    TimePipe,
    TimestampPipe,
    ErrorDialogComponent,
  ],
  exports: [
    CommonModule,
    TimePipe,
    TimestampPipe,
  ]
})
export class SharedModule { }
