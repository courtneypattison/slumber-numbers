import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { config } from '../../../testing/mock-config';

import { SleepTimeService } from './sleep-time.service';
import { LoggerService } from '../../core/logger.service';

import { MockLoggerService } from '../../../testing/mock-logger.service';

describe('SleepTimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule,
        RouterTestingModule
      ],
      providers: [
        SleepTimeService,
        { provide: LoggerService, useClass: MockLoggerService },
        AngularFireAuth
      ]
    });
  });

  it('should be created', inject([SleepTimeService], (service: SleepTimeService) => {
    expect(service).toBeTruthy();
  }));
});
