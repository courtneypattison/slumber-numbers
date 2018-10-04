import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AuthService } from '../../auth/shared/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { config } from '../../../testing/mock-config';

import { LoggerService } from '../../core/logger.service';

import { MockLoggerService } from '../../../testing/mock-logger.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let debug: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule,
      ],
      providers: [
        AuthService,
        AngularFireAuth,
        { provide: LoggerService, useClass: MockLoggerService },
      ],
      declarations: [HeaderComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    debug = fixture.debugElement.query(By.css('header'));
    element = debug.nativeElement;

    fixture.detectChanges();
  });

  it('should create the header', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    fixture.detectChanges();
    expect(element.textContent).toContain(component.title);
  });
});
