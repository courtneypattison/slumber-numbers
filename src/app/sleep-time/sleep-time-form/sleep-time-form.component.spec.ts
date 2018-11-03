import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatNativeDateModule } from '@angular/material/';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { LoggerService } from 'app/core/logger.service';
import { config } from 'testing/mock-config';
import { SleepTimeFormComponent } from 'app/sleep-time/sleep-time-form/sleep-time-form.component';
import { SleepTimeService } from 'app/sleep-time/shared/sleep-time.service';
import { MockLoggerService } from 'testing/mock-logger.service';

describe('SleepTimeFormComponent', () => {
  let component: SleepTimeFormComponent;
  let fixture: ComponentFixture<SleepTimeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule,
        MatNativeDateModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatSelectModule,
      ],
      providers: [
        SleepTimeService,
        { provide: LoggerService, useClass: MockLoggerService },
        AngularFireAuth
      ],
      declarations: [SleepTimeFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepTimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
