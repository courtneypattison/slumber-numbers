import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepTimeComponent } from './sleep-time.component';
import { SleepTimeChartComponent } from './sleep-time-chart/sleep-time-chart.component';
import { SleepTimeService } from './shared/sleep-time.service';
import { LoggerService } from '../core/logger.service';

import { MockLoggerService } from '../../testing/mock-logger.service';

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
        { provide: LoggerService, useClass: MockLoggerService }
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
