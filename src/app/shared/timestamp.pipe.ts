import { Pipe, PipeTransform } from '@angular/core';

import { firestore } from 'firebase/app';

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  transform(timestamp: firestore.Timestamp, format?: string): string {
    return timestamp.toDate().toDateString();
  }
}
