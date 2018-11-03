import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { firestore } from 'firebase/app';
import { of, throwError } from 'rxjs';

import { AuthService, NO_USER_ERROR } from '../../auth/shared/auth.service';
import { LoggerService } from '../../core/logger.service';
import { SleepState } from './sleep-state.model';
import { SleepTime } from './sleep-time.model';
import { SleepTimeService } from './sleep-time.service';
import { StubFirebaseUser } from '../../../testing/stub-firebase-user';
import { StubSleepChartRows } from '../../../testing/stub-sleep-chart-rows';
import { StubSleepTimes } from '../../../testing/stub-sleep-times';
import { MockLoggerService } from '../../../testing/mock-logger.service';

describe('SleepTimeService', () => {
  let angularFirestoreSpy: jasmine.SpyObj<AngularFirestore>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let collectionSpy: jasmine.SpyObj<AngularFirestoreCollection>;
  let docSpy: jasmine.SpyObj<AngularFirestoreDocument>;
  let dummyDate: Date;
  let dummyFirestoreError: firestore.FirestoreError;
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
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['getCurrentUser', 'getCurrentUserState']) },
        { provide: LoggerService, useClass: MockLoggerService },
        SleepTimeService,
      ]
    });

    angularFirestoreSpy = TestBed.get(AngularFirestore);
    authServiceSpy = TestBed.get(AuthService);
    collectionSpy = jasmine.createSpyObj('collection', ['doc', 'valueChanges']);
    docSpy = jasmine.createSpyObj('doc', ['delete', 'set']);
    dummyFirestoreError = { code: 'permission-denied', name: 'Permission denied', message: 'The caller does not have permission.' };
    dummyDate = new Date(0, 0);
    dummySleepState = SleepState.Asleep;
    dummySleepTimeId = 'dummySleepTimeId';
    mockLoggerService = TestBed.get(LoggerService);
    sleepTimeService = TestBed.get(SleepTimeService);
  });

  it('should be created', inject([SleepTimeService], (service: SleepTimeService) => {
    expect(service).toBeTruthy();
  }));

  describe('#setSleepTime', () => {
    it('should return a Promise containing void', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(new Promise((resolve) => resolve(StubFirebaseUser)));
      docSpy.set.and.returnValue(new Promise((resolve) => resolve()));
      collectionSpy.doc.and.returnValue(docSpy);
      angularFirestoreSpy.collection.and.returnValue(collectionSpy);

      sleepTimeService.setSleepTime(dummyDate, dummySleepState).then((result: void) => {
        expect(result).toBeUndefined();
        done();
      });
    });

    it('should throw a no user error', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(new Promise((resolve, reject) => reject(NO_USER_ERROR)));
      docSpy.set.and.returnValue(new Promise((resolve) => resolve()));
      collectionSpy.doc.and.returnValue(docSpy);
      angularFirestoreSpy.collection.and.returnValue(collectionSpy);

      sleepTimeService.setSleepTime(dummyDate, dummySleepState).then().catch((error) => {
        expect(error).toBe(NO_USER_ERROR);
        done();
      });
    });

    it('should throw a firestore error', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(new Promise((resolve) => resolve(StubFirebaseUser)));
      docSpy.set.and.returnValue(new Promise((resolve, reject) => reject(dummyFirestoreError)));
      collectionSpy.doc.and.returnValue(docSpy);
      angularFirestoreSpy.collection.and.returnValue(collectionSpy);

      sleepTimeService.setSleepTime(dummyDate, dummySleepState).then().catch((error: firestore.FirestoreError) => {
        expect(error).toBe(dummyFirestoreError);
        done();
      });
    });

    it('should set a sleep time in firestore', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(new Promise((resolve) => resolve(StubFirebaseUser)));
      docSpy.set.and.returnValue(new Promise((resolve) => resolve()));
      collectionSpy.doc.and.returnValue(docSpy);
      angularFirestoreSpy.collection.and.returnValue(collectionSpy);

      sleepTimeService.setSleepTime(dummyDate, dummySleepState).then((result: void) => {
        expect(docSpy.set).toHaveBeenCalledWith({
          startTimestamp: firestore.Timestamp.fromDate(dummyDate),
          sleepState: dummySleepState
        });
        done();
      });
    });
  });

  describe('#deleteAllSleepTimes', () => {
    it('should return a Promise containing void', (done: DoneFn) => {
      authServiceSpy.getCurrentUserState.and.returnValue(of(StubFirebaseUser));
      collectionSpy.valueChanges.and.returnValue(of([]));
      angularFirestoreSpy.collection.and.returnValue(collectionSpy);

      sleepTimeService.deleteAllSleepTimes().then((result: void) => {
        expect(result).toBeUndefined();
        done();
      });
    });

    it('should delete all sleep times', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(new Promise((resolve) => resolve(StubFirebaseUser)));
      authServiceSpy.getCurrentUserState.and.returnValue(of(StubFirebaseUser));
      docSpy.delete.and.returnValue(new Promise((resolve) => resolve()));
      angularFirestoreSpy.doc.and.returnValue(docSpy);
      collectionSpy.valueChanges.and.returnValue(of(StubSleepTimes));
      angularFirestoreSpy.collection.and.returnValue(collectionSpy);

      sleepTimeService.deleteAllSleepTimes().then((result: void) => {
        expect(docSpy.delete).toHaveBeenCalledTimes(StubSleepTimes.length);
        expect(result).toBeUndefined();
        done();
      });
    });

    it('should throw a firebase error', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(new Promise((resolve) => resolve(StubFirebaseUser)));
      authServiceSpy.getCurrentUserState.and.returnValue(of(StubFirebaseUser));
      collectionSpy.valueChanges.and.returnValue(of(StubSleepTimes));
      docSpy.delete.and.returnValue(new Promise((resolve, reject) => reject(dummyFirestoreError)));
      angularFirestoreSpy.doc.and.returnValue(docSpy);
      angularFirestoreSpy.collection.and.returnValue(collectionSpy);

      sleepTimeService.deleteAllSleepTimes().catch((error) => {
        expect(error).toBe(dummyFirestoreError);
        done();
      });
    });
  });

  describe('#deleteSleepTime', () => {
    it('should return a Promise containing void', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(new Promise((resolve) => resolve(StubFirebaseUser)));
      docSpy.delete.and.returnValue(new Promise((resolve) => resolve()));
      angularFirestoreSpy.doc.and.returnValue(docSpy);

      sleepTimeService.deleteSleepTime(dummySleepTimeId).then((result: void) => {
        expect(result).toBeUndefined();
        done();
      });
    });

    it('should throw a no user error', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(new Promise((resolve, reject) => reject(NO_USER_ERROR)));
      docSpy.delete.and.returnValue(new Promise((resolve) => resolve()));
      angularFirestoreSpy.doc.and.returnValue(docSpy);

      sleepTimeService.deleteSleepTime(dummySleepTimeId).then().catch((error) => {
        expect(error).toBe(NO_USER_ERROR);
        done();
      });
    });

    it('should throw a firestore error', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(new Promise((resolve) => resolve(StubFirebaseUser)));
      docSpy.delete.and.returnValue(new Promise((resolve, reject) => reject(dummyFirestoreError)));
      angularFirestoreSpy.doc.and.returnValue(docSpy);

      sleepTimeService.deleteSleepTime(dummySleepTimeId).then().catch((error: firestore.FirestoreError) => {
        expect(error).toEqual(dummyFirestoreError);
        done();
      });
    });

    it('should delete a sleep time from firestore', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(new Promise((resolve) => resolve(StubFirebaseUser)));
      docSpy.delete.and.returnValue(new Promise((resolve) => resolve()));
      angularFirestoreSpy.doc.and.returnValue(docSpy);

      sleepTimeService.deleteSleepTime(dummySleepTimeId).then(() => {
        expect(angularFirestoreSpy.doc).toHaveBeenCalledWith(jasmine.stringMatching(dummySleepTimeId));
        expect(docSpy.delete).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('#getSleepTimes', () => {
    it('should return Observable<SleepTime[]>', (done: DoneFn) => {
      authServiceSpy.getCurrentUserState.and.returnValue(of(StubFirebaseUser));
      collectionSpy.valueChanges.and.returnValue(of(StubSleepTimes));
      angularFirestoreSpy.collection.and.returnValue(collectionSpy);

      sleepTimeService.getSleepTimes().subscribe((sleepTimes: SleepTime[]) => {
        expect(sleepTimes).toEqual(StubSleepTimes);
        done();
      });
    });

    it('should return a Observable<SleepTime[]> that is empty', (done: DoneFn) => {
      authServiceSpy.getCurrentUserState.and.returnValue(of(null));
      collectionSpy.valueChanges.and.returnValue(StubSleepTimes);
      angularFirestoreSpy.collection.and.returnValue(collectionSpy);

      sleepTimeService.getSleepTimes().subscribe((sleepTimes: SleepTime[]) => {
        expect(sleepTimes).toEqual([]);
        done();
      });
    });

    it('should return a Observable<SleepTime[]> that is empty', (done: DoneFn) => {
      authServiceSpy.getCurrentUserState.and.returnValue(of(StubFirebaseUser));
      collectionSpy.valueChanges.and.returnValue(throwError(dummyFirestoreError));
      angularFirestoreSpy.collection.and.returnValue(collectionSpy);

      sleepTimeService.getSleepTimes().subscribe((sleepTimes: SleepTime[]) => {
        expect(sleepTimes).toEqual([]);
        done();
      });
    });
  });

  describe('#getSleepChartRows', () => {
    it('should return SleepTimeChartRow[]', () => {

      const sleepChartRows = sleepTimeService.getSleepChartRows(StubSleepTimes);
      // tslint:disable-next-line:forin
      for (const i in sleepChartRows) {
        expect(sleepChartRows[i]).toEqual(StubSleepChartRows[i]);
      }
    });
  });
});
