import { TestBed, inject } from '@angular/core/testing';

import { SleepService } from './sleep.service';
import { LoggerService } from '../../core/logger.service';

import { MockLoggerService } from '../../../testing/mock-logger.service';

describe('SleepLogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SleepService,
        { provide: LoggerService, useClass: MockLoggerService }
      ]
    });
  });

  it('should be created', inject([SleepService], (service: SleepService) => {
    expect(service).toBeTruthy();
  }));
});
