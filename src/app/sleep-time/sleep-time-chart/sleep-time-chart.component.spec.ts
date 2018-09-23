import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepTimeChartComponent } from './sleep-time-chart.component';
import { SleepTimeService } from '../shared/sleep-time.service';
import { LoggerService } from '../../core/logger.service';

import { MockLoggerService } from '../../../testing/mock-logger.service';

describe('SleepTimeChartComponent', () => {
  let component: SleepTimeChartComponent;
  let fixture: ComponentFixture<SleepTimeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SleepTimeChartComponent ],
      providers: [
        SleepTimeService,
        { provide: LoggerService, useClass: MockLoggerService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepTimeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
