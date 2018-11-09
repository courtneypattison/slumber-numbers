import { TestBed, inject } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { of, throwError } from 'rxjs';

import { AuthService, NoUserError } from 'app/auth/shared/auth.service';
import { AuthGuardService } from 'app/auth/shared/auth-guard.service';
import { LoggerService } from 'app/core/logger.service';
import { MockLoggerService } from 'testing/mock-logger.service';
import { StubFirebaseUser } from 'testing/stub-firebase-user';

function getActivatedRouteSnapshot(url: string): ActivatedRouteSnapshot {
  return { url: [new UrlSegment(url, {})] } as ActivatedRouteSnapshot;
}

describe('AuthGuardService', () => {
  let authGuardService: AuthGuardService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  const dummyRouterStateSnapshot = {} as RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['getCurrentUser', 'getCurrentUserState']) },
        AuthGuardService,
        { provide: LoggerService, useClass: MockLoggerService },
      ]
    });

    authGuardService = TestBed.get(AuthGuardService);
    authServiceSpy = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(authGuardService).toBeTruthy();
  });

  describe('#canActivate', () => {
    it('should activate dashboard', (done: DoneFn) => {
      authServiceSpy.getCurrentUserState.and.returnValue(of(StubFirebaseUser));

      authGuardService.canActivate(getActivatedRouteSnapshot('dashboard'), dummyRouterStateSnapshot).subscribe((result: boolean) => {
        expect(result).toBeTruthy();
        done();
      });
    });

    it('shouldn\'t activate dashboard', (done: DoneFn) => {
      authServiceSpy.getCurrentUserState.and.returnValue(throwError(NoUserError));

      authGuardService.canActivate(getActivatedRouteSnapshot('dashboard'), dummyRouterStateSnapshot).subscribe((result: boolean) => {
        expect(result).toBeFalsy();
        done();
      });
    });

    it('should activate account', (done: DoneFn) => {
      authServiceSpy.getCurrentUserState.and.returnValue(of(StubFirebaseUser));

      authGuardService.canActivate(getActivatedRouteSnapshot('account'), dummyRouterStateSnapshot).subscribe((result: boolean) => {
        expect(result).toBeTruthy();
        done();
      });
    });

    it('shouldn\'t activate account', (done: DoneFn) => {
      authServiceSpy.getCurrentUserState.and.returnValue(throwError(NoUserError));

      authGuardService.canActivate(getActivatedRouteSnapshot('account'), dummyRouterStateSnapshot).subscribe((result: boolean) => {
        expect(result).toBeFalsy();
        done();
      });
    });

    it('should activate signup', (done: DoneFn) => {
      authServiceSpy.getCurrentUserState.and.returnValue(throwError(NoUserError));

      authGuardService.canActivate(getActivatedRouteSnapshot('signup'), dummyRouterStateSnapshot).subscribe((result: boolean) => {
        expect(result).toBeTruthy();
        done();
      });
    });

    it('shouldn\'t activate signup', (done: DoneFn) => {
      authServiceSpy.getCurrentUserState.and.returnValue(of(StubFirebaseUser));

      authGuardService.canActivate(getActivatedRouteSnapshot('signup'), dummyRouterStateSnapshot).subscribe((result: boolean) => {
        expect(result).toBeFalsy();
        done();
      });
    });

    it('should activate signin', (done: DoneFn) => {
      authServiceSpy.getCurrentUserState.and.returnValue(throwError(NoUserError));

      authGuardService.canActivate(getActivatedRouteSnapshot('signin'), dummyRouterStateSnapshot).subscribe((result: boolean) => {
        expect(result).toBeTruthy();
        done();
      });
    });

    it('shouldn\'t activate signin', (done: DoneFn) => {
      authServiceSpy.getCurrentUserState.and.returnValue(of(StubFirebaseUser));

      authGuardService.canActivate(getActivatedRouteSnapshot('signin'), dummyRouterStateSnapshot).subscribe((result: boolean) => {
        expect(result).toBeFalsy();
        done();
      });
    });
  });
});
