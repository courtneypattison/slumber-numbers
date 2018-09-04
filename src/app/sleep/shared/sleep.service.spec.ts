import { TestBed, inject } from '@angular/core/testing';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { config } from '../../../testing/mock-config';

import { SleepService } from './sleep.service';
import { LoggerService } from '../../core/logger.service';

import { MockLoggerService } from '../../../testing/mock-logger.service';

describe('SleepService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule
      ],
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
