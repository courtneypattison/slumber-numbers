import { Injectable } from '@angular/core';

@Injectable()
export class MockLoggerService {
  output = {
    log: [],
    error: [],
    warn: []
  };

  log(value: any, ...rest) {
    this.output.log.push([value, ...rest]);
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
    this.output.error.push([value, ...rest]);
  }

  warn(value: any, ...rest) {
    this.output.warn.push([value, ...rest]);
  }
}
