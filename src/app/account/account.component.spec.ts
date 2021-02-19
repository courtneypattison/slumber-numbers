import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountComponent } from 'app/account/account.component';
import { AccountDeleteComponent } from 'app/account/account-delete/account-delete.component';
import { AccountService } from 'app/account/shared/account.service';
import { LoggerService } from 'app/core/logger.service';
import { config } from 'testing/mock-config';
import { FakeLoggerService } from 'testing/fake-logger.service';

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
        AngularFirestoreModule,
        MatDialogModule,
        RouterTestingModule,
      ],
      providers: [
        AngularFireAuth,
        AccountService,
        { provide: LoggerService, useClass: FakeLoggerService },
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
