import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from 'app/auth/shared/auth.service';
import { HeaderComponent } from 'app/core/header/header.component';
import { LoggerService } from 'app/core/logger.service';
import { config } from 'testing/mock-config';
import { FakeLoggerService } from 'testing/fake-logger.service';

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
        { provide: LoggerService, useClass: FakeLoggerService },
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
