import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { config } from '../../../testing/mock-config';

import { LoggerService } from '../../core/logger.service';

import { MockLoggerService } from '../../../testing/mock-logger.service';

import { SleepTimeTableComponent } from './sleep-time-table.component';

describe('SleepTimeTableComponent', () => {
  let component: SleepTimeTableComponent;
  let fixture: ComponentFixture<SleepTimeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatTableModule
      ],
      declarations: [SleepTimeTableComponent],
      providers: [
        AngularFireAuth,
        { provide: LoggerService, useClass: MockLoggerService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
