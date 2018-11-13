import { TestBed } from '@angular/core/testing';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountService } from 'app/account/shared/account.service';
import { AuthService } from 'app/auth/shared/auth.service';
import { LoggerService } from 'app/core/logger.service';
import { SleepTimeService } from 'app/sleep-time/shared/sleep-time.service';
import { FakeLoggerService } from 'testing/fake-logger.service';

describe('AccountService', () => {
  let accountService: AccountService;
  let angularFirestoreSpy: jasmine.SpyObj<AngularFirestore>;
  let collectionSpy: jasmine.SpyObj<AngularFirestoreCollection>;
  let docSpy: jasmine.SpyObj<AngularFirestoreDocument>;

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
        AccountService,
        { provide: LoggerService, useClass: FakeLoggerService },
        { provide: SleepTimeService, useValue: jasmine.createSpyObj('SleepTimeService', ['deleteAllSleepTimes']) },
      ]
    });

    accountService = TestBed.get(AccountService);
  });

  it('should be created', () => {
    expect(accountService).toBeTruthy();
  });
});
