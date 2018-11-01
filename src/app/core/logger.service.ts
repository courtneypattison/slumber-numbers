import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable()
export class LoggerService {

  log(value: any, ...rest) {
    if (!environment.production) {
      console.log(value, ...rest);
    }
  }

  logPromise(resolveMessage: string, rejectMessage: string, promise: Promise<any>): Promise<any> {
    return new Promise((resolve, reject) => {
        promise.then((result) => {
          this.log(`${resolveMessage}:
            result: ${result}`);

          resolve(result);
        }).catch((error) => {
          this.log(`${rejectMessage}:
            error: ${error}`);

          reject(error);
        });
    });
  }

  error(value: any, ...rest) {
    console.error(value, ...rest);
  }

  warn(value: any, ...rest) {
    console.warn(value, ...rest);
  }
}
