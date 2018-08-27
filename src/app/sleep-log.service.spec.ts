import { TestBed, inject } from '@angular/core/testing';

import { SleepLogService } from './sleep-log.service';

describe('SleepLogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SleepLogService]
    });
  });

  it('should be created', inject([SleepLogService], (service: SleepLogService) => {
    expect(service).toBeTruthy();
  }));
});
