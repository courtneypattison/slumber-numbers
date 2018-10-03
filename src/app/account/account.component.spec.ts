import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { config } from '../../testing/mock-config';

import { AccountService } from './shared/account.service';
import { LoggerService } from '../core/logger.service';
import { MockLoggerService } from '../../testing/mock-logger.service';

import { AccountComponent } from './account.component';
import { AccountDeleteComponent } from './account-delete/account-delete.component';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccountComponent,
        AccountDeleteComponent,
      ],
      imports: [
        AngularFireModule.initializeApp(config),
        RouterTestingModule,
        AngularFirestoreModule,
      ],
      providers: [
        AngularFireAuth,
        AccountService,
        { provide: LoggerService, useClass: MockLoggerService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
