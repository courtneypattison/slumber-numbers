import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepComponent } from './sleep.component';
import { SleepChartComponent } from './sleep-chart/sleep-chart.component';
import { SleepService } from './shared/sleep.service';
import { LoggerService } from '../core/logger.service';

import { MockLoggerService } from '../../testing/mock-logger.service';

describe('SleepComponent', () => {
  let component: SleepComponent;
  let fixture: ComponentFixture<SleepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SleepComponent,
        SleepChartComponent
      ],
      providers: [
        SleepService,
        { provide: LoggerService, useClass: MockLoggerService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
