import { TestBed, inject } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from 'app/auth/shared/auth.service';
import { LoggerService } from 'app/core/logger.service';
import { config } from 'testing/mock-config';
import { MockLoggerService } from 'testing/mock-logger.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule,
        RouterTestingModule,
      ],
      providers: [
        AngularFireAuth,
        AuthService,
        { provide: LoggerService, useClass: MockLoggerService },
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
