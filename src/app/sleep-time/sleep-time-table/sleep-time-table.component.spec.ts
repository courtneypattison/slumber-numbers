import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { LoggerService } from 'app/core/logger.service';
import { TimestampPipe } from 'app/shared/timestamp.pipe';
import { SleepTimeService } from 'app/sleep-time/shared/sleep-time.service';
import { SleepTimeTableComponent } from 'app/sleep-time/sleep-time-table/sleep-time-table.component';
import { config } from 'testing/mock-config';
import { FakeLoggerService } from 'testing/mock-logger.service';

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
        { provide: LoggerService, useClass: FakeLoggerService },
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
