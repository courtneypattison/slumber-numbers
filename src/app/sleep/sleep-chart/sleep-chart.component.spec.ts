import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepChartComponent } from './sleep-chart.component';
import { SleepService } from '../shared/sleep.service';
import { LoggerService } from '../../core/logger.service';

import { MockLoggerService } from '../../../testing/mock-logger.service';

describe('SleepChartComponent', () => {
  let component: SleepChartComponent;
  let fixture: ComponentFixture<SleepChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SleepChartComponent ],
      providers: [
        SleepService,
        { provide: LoggerService, useClass: MockLoggerService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
