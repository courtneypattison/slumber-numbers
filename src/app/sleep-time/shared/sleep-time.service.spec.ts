import { TestBed } from '@angular/core/testing';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';

import { firestore } from 'firebase/app';
import { of, throwError } from 'rxjs';

import { AuthService, NoUserError } from 'app/auth/shared/auth.service';
import { LoggerService } from 'app/core/logger.service';
import { State } from 'app/sleep-time/shared/state.model';
import { SleepTime } from 'app/sleep-time/shared/sleep-time.model';
import { SleepTimeService } from 'app/sleep-time/shared/sleep-time.service';
import { FakeLoggerService } from 'testing/fake-logger.service';
import { StubFirebaseUser } from 'testing/stub-firebase-user';
import { StubFirestoreError } from 'testing/stub-firestore-error';
import { StubSleepChartRows } from 'testing/stub-sleep-chart-rows';
import { StubSleepTimes } from 'testing/stub-sleep-times';

describe('SleepTimeService', () => {
  const dummyDate = new Date(0, 0);
  const dummyState = State.Asleep;
  const dummySleepTimeId = 'dummySleepTimeId';

  let angularFirestoreSpy: jasmine.SpyObj<AngularFirestore>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let collectionSpy: jasmine.SpyObj<AngularFirestoreCollection>;
  let docSpy: jasmine.SpyObj<AngularFirestoreDocument>;
  let fakeLoggerService: LoggerService;
  let sleepTimeService: SleepTimeService;

  beforeEach(() => {
    docSpy = jasmine.createSpyObj('doc', ['delete', 'set']);
    collectionSpy = jasmine.createSpyObj('collection', ['doc', 'valueChanges']);
    collectionSpy.doc.and.returnValue(docSpy);
    angularFirestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc']);
    angularFirestoreSpy.collection.and.returnValue(collectionSpy);
    angularFirestoreSpy.doc.and.returnValue(docSpy);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreSpy },
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['getCurrentUser', 'getCurrentUserState']) },
        { provide: LoggerService, useClass: FakeLoggerService },
        SleepTimeService,
      ]
    });

    angularFirestoreSpy = TestBed.get(AngularFirestore);
    authServiceSpy = TestBed.get(AuthService);
    fakeLoggerService = TestBed.get(LoggerService);
    sleepTimeService = TestBed.get(SleepTimeService);
  });

  it('should be created', () => {
    expect(sleepTimeService).toBeTruthy();
  });

  describe('#setSleepTime', () => {
    it('should return a Promise containing void', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(Promise.resolve(StubFirebaseUser));
      docSpy.set.and.returnValue(Promise.resolve());

      sleepTimeService.setSleepTime(dummyDate, dummyState).then((result: void) => {
        expect(result).toBeUndefined();
        done();
      });
    });

    it('should throw a no user error', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(Promise.reject(NoUserError));
      docSpy.set.and.returnValue(Promise.resolve);

      sleepTimeService.setSleepTime(dummyDate, dummyState).catch((error: Error) => {
        expect(error).toEqual(NoUserError);
        done();
      });
    });

    it('should throw a firestore error', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(Promise.resolve(StubFirebaseUser));
      docSpy.set.and.returnValue(Promise.reject(StubFirestoreError));

      sleepTimeService.setSleepTime(dummyDate, dummyState).catch((error: firestore.FirestoreError) => {
        expect(error).toEqual(StubFirestoreError);
        done();
      });
    });

    it('should set a sleep time in firestore', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(Promise.resolve(StubFirebaseUser));
      docSpy.set.and.returnValue(Promise.resolve());

      sleepTimeService.setSleepTime(dummyDate, dummyState).then((result: void) => {
        expect(docSpy.set).toHaveBeenCalledWith({
          startTimestamp: firestore.Timestamp.fromDate(dummyDate),
          state: dummyState
        });
        done();
      });
    });
  });

  describe('#deleteAllSleepTimes', () => {
    it('should return a Promise containing void', (done: DoneFn) => {
      authServiceSpy.getCurrentUserState.and.returnValue(of(StubFirebaseUser));
      collectionSpy.valueChanges.and.returnValue(of([]));

      sleepTimeService.deleteAllSleepTimes().then((result: void) => {
        expect(result).toBeUndefined();
        done();
      });
    });

    it('should delete all sleep times', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(Promise.resolve(StubFirebaseUser));
      authServiceSpy.getCurrentUserState.and.returnValue(of(StubFirebaseUser));
      docSpy.delete.and.returnValue(Promise.resolve());
      collectionSpy.valueChanges.and.returnValue(of(StubSleepTimes));

      sleepTimeService.deleteAllSleepTimes().then((result: void) => {
        expect(docSpy.delete).toHaveBeenCalledTimes(StubSleepTimes.length);
        expect(result).toBeUndefined();
        done();
      });
    });

    it('should throw a firebase error', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(Promise.resolve(StubFirebaseUser));
      authServiceSpy.getCurrentUserState.and.returnValue(of(StubFirebaseUser));
      collectionSpy.valueChanges.and.returnValue(of(StubSleepTimes));
      docSpy.delete.and.returnValue(Promise.reject(StubFirestoreError));

      sleepTimeService.deleteAllSleepTimes().catch((error) => {
        expect(error).toEqual(StubFirestoreError);
        done();
      });
    });
  });

  describe('#deleteSleepTime', () => {
    it('should return a Promise containing void', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(Promise.resolve(StubFirebaseUser));
      docSpy.delete.and.returnValue(Promise.resolve());

      sleepTimeService.deleteSleepTime(dummySleepTimeId).then((result: void) => {
        expect(result).toBeUndefined();
        done();
      });
    });

    it('should throw a no user error', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(Promise.reject(NoUserError));
      docSpy.delete.and.returnValue(Promise.resolve());

      sleepTimeService.deleteSleepTime(dummySleepTimeId).catch((error: Error) => {
        expect(error).toEqual(NoUserError);
        done();
      });
    });

    it('should throw a firestore error', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(Promise.resolve(StubFirebaseUser));
      docSpy.delete.and.returnValue(Promise.reject(StubFirestoreError));

      sleepTimeService.deleteSleepTime(dummySleepTimeId).catch((error: firestore.FirestoreError) => {
        expect(error).toEqual(StubFirestoreError);
        done();
      });
    });

    it('should delete a sleep time from firestore', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(Promise.resolve(StubFirebaseUser));
      docSpy.delete.and.returnValue(Promise.resolve());

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

      sleepTimeService.getSleepTimes().subscribe((sleepTimes: SleepTime[]) => {
        expect(sleepTimes).toEqual(StubSleepTimes);
        done();
      });
    });

    it('should return a Observable<SleepTime[]> that is empty', (done: DoneFn) => {
      authServiceSpy.getCurrentUserState.and.returnValue(of(null));
      collectionSpy.valueChanges.and.returnValue(StubSleepTimes);

      sleepTimeService.getSleepTimes().subscribe((sleepTimes: SleepTime[]) => {
        expect(sleepTimes).toEqual([]);
        done();
      });
    });

    it('should return a Observable<SleepTime[]> that is empty', (done: DoneFn) => {
      authServiceSpy.getCurrentUserState.and.returnValue(of(StubFirebaseUser));
      collectionSpy.valueChanges.and.returnValue(throwError(StubFirestoreError));

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
