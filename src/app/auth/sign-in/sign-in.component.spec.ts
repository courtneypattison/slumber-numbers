import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';

import { LoggerService } from 'app/core/logger.service';
import { SignInComponent } from 'app/auth/sign-in/sign-in.component';
import { config } from 'testing/mock-config';
import { MockLoggerService } from 'testing/mock-logger.service';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(config)
      ],
      providers: [
        AngularFireAuth,
        { provide: LoggerService, useClass: MockLoggerService },
      ],
      declarations: [ SignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
