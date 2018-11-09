import { TestBed, inject } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';

import * as firebase from 'firebase/app';
import { of } from 'rxjs';

import { AuthService, NoUserError } from 'app/auth/shared/auth.service';
import { LoggerService } from 'app/core/logger.service';
import { MockLoggerService } from 'testing/mock-logger.service';
import { StubFirebaseAuthError } from 'testing/stub-firebase-auth-error';
import { StubFirebaseUser } from 'testing/stub-firebase-user';
import { StubUserCredential } from 'testing/stub-user-credential';
import { StubFirestoreError } from 'testing/stub-firestore-error';

describe('AuthService', () => {
  let authService: AuthService;
  let authSpy: jasmine.SpyObj<firebase.auth.Auth>;
  let stubAngularFireAuth;
  let angularFirestoreSpy: jasmine.SpyObj<AngularFirestore>;
  let collectionSpy: jasmine.SpyObj<AngularFirestoreCollection>;
  let docSpy: jasmine.SpyObj<AngularFirestoreDocument>;
  let mockLoggerService: LoggerService;

  beforeEach(() => {
    docSpy = jasmine.createSpyObj('AngularFirestoreDocument', ['delete', 'set']);
    collectionSpy = jasmine.createSpyObj('AngularFirestoreCollection', ['doc', 'valueChanges']);
    collectionSpy.doc.and.returnValue(docSpy);
    angularFirestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc']);
    angularFirestoreSpy.collection.and.returnValue(collectionSpy);
    angularFirestoreSpy.doc.and.returnValue(docSpy);

    authSpy = jasmine.createSpyObj('Auth', ['signInWithPopup', 'signOut']);
    stubAngularFireAuth = { auth: authSpy };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreSpy },
        { provide: AngularFireAuth, useValue: stubAngularFireAuth },
        AuthService,
        { provide: LoggerService, useClass: MockLoggerService },
      ]
    });

    angularFirestoreSpy = TestBed.get(AngularFirestore);
    stubAngularFireAuth = TestBed.get(AngularFireAuth);
    mockLoggerService = TestBed.get(LoggerService);
    authService = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('#signInWithGoogle', () => {
    it('should return a Promise containing void', (done: DoneFn) => {
      authSpy.signInWithPopup.and.returnValue(Promise.resolve(StubUserCredential));
      docSpy.set.and.returnValue(Promise.resolve());

      authService.signInWithGoogle().then((result: void) => {
        expect(result).toBeUndefined();
        done();
      });
    });

    it('should set account doc with user uid', (done: DoneFn) => {
      authSpy.signInWithPopup.and.returnValue(Promise.resolve(StubUserCredential));
      docSpy.set.and.returnValue(Promise.resolve());

      authService.signInWithGoogle().then((result: void) => {
        expect(docSpy.set).toHaveBeenCalledWith({ uid: StubUserCredential.user.uid });
        done();
      });
    });

    it('should throw a firebase auth error', (done: DoneFn) => {
      authSpy.signInWithPopup.and.returnValue(Promise.reject(StubFirebaseAuthError));

      authService.signInWithGoogle().catch((error: firebase.auth.Error) => {
        expect(error).toEqual(StubFirebaseAuthError);
        done();
      });
    });

    it('should throw a firestore error', (done: DoneFn) => {
      authSpy.signInWithPopup.and.returnValue(Promise.resolve(StubUserCredential));
      docSpy.set.and.returnValue(Promise.reject(StubFirestoreError));

      authService.signInWithGoogle().catch((error: firebase.auth.Error) => {
        expect(error).toEqual(StubFirestoreError);
        done();
      });
    });
  });

  describe('#signOut', () => {
    it('should return a Promise containing void', (done: DoneFn) => {
      authSpy.signOut.and.returnValue(Promise.resolve());

      authService.signOut().then((result: void) => {
        expect(result).toBeUndefined();
        done();
      });
    });

    it('should throw a firebase auth error', (done: DoneFn) => {
      authSpy.signOut.and.returnValue(Promise.reject(StubFirebaseAuthError));

      authService.signOut().catch((error: firebase.auth.Error) => {
        expect(error).toEqual(StubFirebaseAuthError);
        done();
      });
    });
  });

  describe('#getCurrentUserState', () => {
    it('should throw a no user error', (done: DoneFn) => {
      stubAngularFireAuth.user = of(null);

      authService.getCurrentUserState().subscribe(() => {}, (error: Error) => {
        expect(error).toEqual(NoUserError);
        done();
      });
    });

    it('should return Observable<firebase.User>', (done: DoneFn) => {
      stubAngularFireAuth.user = of(StubFirebaseUser);

      authService.getCurrentUserState().subscribe((currentUser: firebase.User) => {
        expect(currentUser).toBe(StubFirebaseUser);
        done();
      });
    });
  });

  describe('#getCurrentUser', () => {
    it('should return a Promise containing void', (done: DoneFn) => {
      stubAngularFireAuth.user = of(StubFirebaseUser);

      authService.getCurrentUser().then((currentUser: firebase.User) => {
        expect(currentUser).toBe(StubFirebaseUser);
        done();
      });
    });

    it('should return a no user error', (done: DoneFn) => {
      stubAngularFireAuth.user = of(null);

      authService.getCurrentUser().catch((error: Error) => {
        expect(error).toEqual(NoUserError);
        done();
      });
    });
  });

  describe('#getUserInital', () => {
    it('should return an empty string', (done: DoneFn) => {
      stubAngularFireAuth.user = of(null);

      authService.getUserInitial().subscribe((inital: string) => {
        expect(inital).toBe('');
        done();
      });
    });

    it('should return the user\'s inital', (done: DoneFn) => {
      stubAngularFireAuth.user = of(StubFirebaseUser);

      authService.getUserInitial().subscribe((inital: string) => {
        expect(inital).toBe(StubFirebaseUser.email[0]);
        done();
      });
    });
  });
});
