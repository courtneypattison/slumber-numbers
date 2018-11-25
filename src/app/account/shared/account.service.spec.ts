import { TestBed } from '@angular/core/testing';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountService } from 'app/account/shared/account.service';
import { AuthService, NoUserError } from 'app/auth/shared/auth.service';
import { LoggerService } from 'app/core/logger.service';
import { SleepTimeService } from 'app/sleep-time/shared/sleep-time.service';
import { FakeLoggerService } from 'testing/fake-logger.service';
import { StubFirebaseError } from 'testing/stub-firebase-error';
import { StubFirestoreError } from 'testing/stub-firestore-error';

describe('AccountService', () => {
  let accountService: AccountService;
  let angularFirestoreSpy: jasmine.SpyObj<AngularFirestore>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let currentUserSpy: jasmine.SpyObj<firebase.User>;
  let docSpy: jasmine.SpyObj<AngularFirestoreDocument>;
  let sleepTimeServiceSpy: jasmine.SpyObj<SleepTimeService>;

  beforeEach(() => {
    docSpy = jasmine.createSpyObj('doc', ['delete']);
    currentUserSpy = jasmine.createSpyObj('User', ['delete']);
    angularFirestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc']);
    angularFirestoreSpy.doc.and.returnValue(docSpy);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getCurrentUser', 'signOut']);
    sleepTimeServiceSpy = jasmine.createSpyObj('SleepTimeService', ['deleteAllSleepTimes']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreSpy },
        { provide: AuthService, useValue: authServiceSpy },
        AccountService,
        { provide: LoggerService, useClass: FakeLoggerService },
        { provide: SleepTimeService, useValue: sleepTimeServiceSpy },
      ]
    });

    accountService = TestBed.get(AccountService);
    authServiceSpy = TestBed.get(AuthService);
    sleepTimeServiceSpy = TestBed.get(SleepTimeService);
  });

  it('should be created', () => {
    expect(accountService).toBeTruthy();
  });

  describe('#deleteAccount', () => {
    it('should return a Promise containing void', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(Promise.resolve(currentUserSpy));
      currentUserSpy.delete.and.returnValue(Promise.resolve());
      sleepTimeServiceSpy.deleteAllSleepTimes.and.returnValue(Promise.resolve());
      docSpy.delete.and.returnValue(Promise.resolve());

      accountService.deleteAccount().then((result) => {
        expect(result).toBeUndefined();
        done();
      });
    });

    it('should throw a NoUserError', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(Promise.reject(NoUserError));
      currentUserSpy.delete.and.returnValue(Promise.resolve());
      sleepTimeServiceSpy.deleteAllSleepTimes.and.returnValue(Promise.resolve());
      docSpy.delete.and.returnValue(Promise.resolve());

      accountService.deleteAccount().catch((error) => {
        expect(error).toEqual(NoUserError);
        done();
      });
    });

    it('should throw a FirebaseError', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(Promise.resolve(currentUserSpy));
      currentUserSpy.delete.and.returnValue(Promise.reject(StubFirebaseError));
      sleepTimeServiceSpy.deleteAllSleepTimes.and.returnValue(Promise.resolve());
      docSpy.delete.and.returnValue(Promise.resolve());

      accountService.deleteAccount().catch((error) => {
        expect(error).toEqual(StubFirebaseError);
        done();
      });
    });

    it('should throw a FirestoreError', (done: DoneFn) => {
      authServiceSpy.getCurrentUser.and.returnValue(Promise.resolve(currentUserSpy));
      currentUserSpy.delete.and.returnValue(Promise.resolve());
      sleepTimeServiceSpy.deleteAllSleepTimes.and.returnValue(Promise.resolve());
      docSpy.delete.and.returnValue(Promise.reject(StubFirestoreError));

      accountService.deleteAccount().catch((error) => {
        expect(error).toEqual(StubFirestoreError);
        done();
      });
    });
  });
});
