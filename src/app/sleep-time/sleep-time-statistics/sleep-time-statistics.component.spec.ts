import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';

import { of } from 'rxjs';

import { AuthService } from 'app/auth/shared/auth.service';
import { LoggerService } from 'app/core/logger.service';
import { SleepTimeService } from 'app/sleep-time/shared/sleep-time.service';
import { SleepTimeStatisticsComponent } from 'app/sleep-time/sleep-time-statistics/sleep-time-statistics.component';
import { TimePipe } from 'app/shared/time.pipe';
import { FakeLoggerService } from 'testing/fake-logger.service';
import { StubSleepTimes } from 'testing/stub-sleep-times';

describe('SleepTimeStatisticsComponent', () => {
  let component: SleepTimeStatisticsComponent;
  let fixture: ComponentFixture<SleepTimeStatisticsComponent>;
  let sleepTimeServiceSpy: jasmine.SpyObj<SleepTimeService>;

  beforeEach(async(() => {
    sleepTimeServiceSpy = jasmine.createSpyObj('SleepTimeService', ['getSleepTimes', 'getAverageDailySleep']);
    sleepTimeServiceSpy.getSleepTimes.and.returnValue(of(StubSleepTimes));
    sleepTimeServiceSpy.getAverageDailySleep.and.returnValue(1000);

    TestBed.configureTestingModule({
      declarations: [
        SleepTimeStatisticsComponent,
        TimePipe,
      ],
      providers: [
        { provide: AngularFirestore, useValue: {} },
        { provide: AuthService, useValue: {} },
        { provide: LoggerService, useClass: FakeLoggerService },
        { provide: SleepTimeService, useValue: sleepTimeServiceSpy },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepTimeStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
