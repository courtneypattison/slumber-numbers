import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';

import { ErrorDialogComponent } from 'app/shared/error-dialog/error-dialog.component';
import { TimestampPipe } from 'app/shared/timestamp.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  declarations: [
    TimestampPipe,
    ErrorDialogComponent,
  ],
  exports: [
    CommonModule,
    TimestampPipe,
  ]
})
export class SharedModule { }
