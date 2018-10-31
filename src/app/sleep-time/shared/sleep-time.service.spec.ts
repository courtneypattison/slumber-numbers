import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AngularFirestore } from 'angularfire2/firestore';
import { firestore } from 'firebase/app';
import { of } from 'rxjs';

import { AuthService } from '../../auth/shared/auth.service';
import { LoggerService } from '../../core/logger.service';
import { SleepState } from './sleep-state.model';
import { SleepTimeService, NO_USER_ERROR } from './sleep-time.service';
import { StubFirebaseUser } from '../../../testing/stub-firebase-user';
import { MockLoggerService } from '../../../testing/mock-logger.service';

describe('SleepTimeService', () => {
  let angularFirestoreSpy: jasmine.SpyObj<AngularFirestore>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let collectionSpy: jasmine.SpyObj<firestore.CollectionReference>;
  let docSpy: jasmine.SpyObj<firestore.DocumentReference>;
  let dummyDate: Date;
  let dummySleepState: SleepState;
  let dummySleepTimeId: string;
  let mockLoggerService: LoggerService;
  let sleepTimeService: SleepTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        { provide: AngularFirestore, useValue: jasmine.createSpyObj('AngularFirestore', ['collection', 'doc']) },
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['getCurrentUser']) },
        { provide: LoggerService, useClass: MockLoggerService },
        SleepTimeService,
      ]
    });

    angularFirestoreSpy = TestBed.get(AngularFirestore);
    authServiceSpy = TestBed.get(AuthService);
    collectionSpy = jasmine.createSpyObj('collection', ['doc']);
    docSpy = jasmine.createSpyObj('doc', ['delete', 'set']);
    dummyDate = new Date(0, 0);
    dummySleepState = SleepState.Asleep;
    dummySleepTimeId = 'dummySleepTimeId';
    mockLoggerService = TestBed.get(LoggerService);
    sleepTimeService = TestBed.get(SleepTimeService);
  });

  it('should be created', inject([SleepTimeService], (service: SleepTimeService) => {
    expect(service).toBeTruthy();
  }));

  describe('#addSleepTime', () => {
    it('should return a Promise containing void', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(of(StubFirebaseUser));
      docSpy.set.and.returnValue(new Promise((resolve) => resolve()));
      collectionSpy.doc.and.returnValue(docSpy);
      angularFirestoreSpy.collection.and.returnValue(collectionSpy);
      sleepTimeService.addSleepTime(dummyDate, dummySleepState).then((result: void) => {
        expect(result).toBeUndefined();
        done();
      });
    });

    it('should throw a no user error', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(of(null));
      docSpy.set.and.returnValue(new Promise((resolve) => resolve()));
      collectionSpy.doc.and.returnValue(docSpy);
      angularFirestoreSpy.collection.and.returnValue(collectionSpy);
      sleepTimeService.addSleepTime(dummyDate, dummySleepState).then().catch((error) => {
        expect(error).toBe(NO_USER_ERROR);
        done();
      });
    });

    it('should log a no user error', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(of(null));
      docSpy.set.and.returnValue(new Promise((resolve) => resolve()));
      collectionSpy.doc.and.returnValue(docSpy);
      angularFirestoreSpy.collection.and.returnValue(collectionSpy);
      spyOn(mockLoggerService, 'error');
      sleepTimeService.addSleepTime(dummyDate, dummySleepState).then().catch((error) => {
        expect(mockLoggerService.error).toHaveBeenCalledWith(jasmine.stringMatching(/NO_USER_ERROR/));
        done();
      });
    });

    it('should log a firestore error', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(of(StubFirebaseUser));
      const errorMessage = 'Some document that we attempted to create already exists.';
      docSpy.set.and.returnValue(new Promise((resolve, reject) => reject({
        code: 'already-exists',
        message: errorMessage
      })));
      collectionSpy.doc.and.returnValue(docSpy);
      angularFirestoreSpy.collection.and.returnValue(collectionSpy);
      spyOn(mockLoggerService, 'error');
      sleepTimeService.addSleepTime(dummyDate, dummySleepState).then().catch((error: firestore.FirestoreError) => {
        expect(mockLoggerService.error).toHaveBeenCalledWith(jasmine.stringMatching(errorMessage));
        done();
      });
    });

    it('should log set sleep state', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(of(StubFirebaseUser));
      docSpy.set.and.returnValue(new Promise((resolve) => resolve()));
      collectionSpy.doc.and.returnValue(docSpy);
      angularFirestoreSpy.collection.and.returnValue(collectionSpy);
      spyOn(mockLoggerService, 'log');
      sleepTimeService.addSleepTime(dummyDate, dummySleepState).then(() => {
        expect(mockLoggerService.log).toHaveBeenCalledWith(jasmine.stringMatching(dummySleepState));
        done();
      });
    });

    it('should set a sleep time in firestore', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(of(StubFirebaseUser));
      docSpy.set.and.returnValue(new Promise((resolve) => resolve()));
      collectionSpy.doc.and.returnValue(docSpy);
      angularFirestoreSpy.collection.and.returnValue(collectionSpy);
      sleepTimeService.addSleepTime(dummyDate, dummySleepState).then((result: void) => {
        expect(docSpy.set).toHaveBeenCalledWith({
          startTimestamp: firestore.Timestamp.fromDate(dummyDate),
          sleepState: dummySleepState
        });
        done();
      });
    });
  });

  describe('#deleteSleepTime', () => {
    it('should return a Promise containing void', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(of(StubFirebaseUser));
      docSpy.delete.and.returnValue(new Promise((resolve) => resolve()));
      angularFirestoreSpy.doc.and.returnValue(docSpy);
      sleepTimeService.deleteSleepTime(dummySleepTimeId).then((result: void) => {
        expect(result).toBeUndefined();
        done();
      });
    });

    it('should throw a no user error', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(of(null));
      docSpy.delete.and.returnValue(new Promise((resolve) => resolve()));
      angularFirestoreSpy.doc.and.returnValue(docSpy);
      sleepTimeService.deleteSleepTime(dummySleepTimeId).then().catch((error) => {
        expect(error).toBe(NO_USER_ERROR);
        done();
      });
    });

    it('should log a no user error', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(of(null));
      docSpy.delete.and.returnValue(new Promise((resolve) => resolve()));
      angularFirestoreSpy.doc.and.returnValue(docSpy);
      spyOn(mockLoggerService, 'error');
      sleepTimeService.deleteSleepTime(dummySleepTimeId).then().catch((error) => {
        expect(mockLoggerService.error).toHaveBeenCalledWith(jasmine.stringMatching(/NO_USER_ERROR/));
        done();
      });
    });

    it('should log a firestore error', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(of(StubFirebaseUser));
      const errorMessage = 'The caller does not have permission to execute the specified operation.';
      docSpy.delete.and.returnValue(new Promise((resolve, reject) => reject({
        code: 'permission-denied',
        message: errorMessage
      })));
      angularFirestoreSpy.doc.and.returnValue(docSpy);
      spyOn(mockLoggerService, 'error');
      sleepTimeService.deleteSleepTime(dummySleepTimeId).then().catch((error: firestore.FirestoreError) => {
        expect(mockLoggerService.error).toHaveBeenCalledWith(jasmine.stringMatching(errorMessage));
        done();
      });
    });

    it('should log deleted sleep', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(of(StubFirebaseUser));
      docSpy.delete.and.returnValue(new Promise((resolve) => resolve()));
      angularFirestoreSpy.doc.and.returnValue(docSpy);
      spyOn(mockLoggerService, 'log');
      sleepTimeService.deleteSleepTime(dummySleepTimeId).then(() => {
        expect(mockLoggerService.log).toHaveBeenCalledWith(jasmine.stringMatching('Deleted'));
        done();
      });
    });

    it('should delete a sleep time from firestore', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(of(StubFirebaseUser));
      docSpy.delete.and.returnValue(new Promise((resolve) => resolve()));
      angularFirestoreSpy.doc.and.returnValue(docSpy);
      sleepTimeService.deleteSleepTime(dummySleepTimeId).then((result: void) => {
        expect(angularFirestoreSpy.doc).toHaveBeenCalledWith(jasmine.stringMatching(dummySleepTimeId));
        expect(docSpy.delete).toHaveBeenCalled();
        done();
      });
    });
  });
});
