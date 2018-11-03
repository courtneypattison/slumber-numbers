import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggerService } from 'app/core/logger.service';
import { MockLoggerService } from 'testing/mock-logger.service';
import { SleepTimeChartComponent } from 'app/sleep-time/sleep-time-chart/sleep-time-chart.component';
import { SleepTimeService } from 'app/sleep-time/shared/sleep-time.service';

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
