import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { config } from '../../../testing/mock-config';

import { SleepTimeService } from '../shared/sleep-time.service';
import { LoggerService } from '../../core/logger.service';

import { MockLoggerService } from '../../../testing/mock-logger.service';

import { SleepTimeTableComponent } from './sleep-time-table.component';
import { TimestampPipe } from '../../shared/timestamp.pipe';


describe('SleepTimeTableComponent', () => {
  let component: SleepTimeTableComponent;
  let fixture: ComponentFixture<SleepTimeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatPaginatorModule,
        MatTableModule,
      ],
      declarations: [
        SleepTimeTableComponent,
        TimestampPipe,
      ],
      providers: [
        SleepTimeService,
        AngularFireAuth,
        { provide: LoggerService, useClass: MockLoggerService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
