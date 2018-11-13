import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggerService } from 'app/core/logger.service';
import { SleepTimeComponent } from 'app/sleep-time/sleep-time.component';
import { SleepTimeChartComponent } from 'app/sleep-time/sleep-time-chart/sleep-time-chart.component';
import { SleepTimeService } from 'app/sleep-time/shared/sleep-time.service';
import { FakeLoggerService } from 'testing/mock-logger.service';

describe('SleepTimeComponent', () => {
  let component: SleepTimeComponent;
  let fixture: ComponentFixture<SleepTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SleepTimeComponent,
        SleepTimeChartComponent
      ],
      providers: [
        SleepTimeService,
        { provide: LoggerService, useClass: FakeLoggerService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
