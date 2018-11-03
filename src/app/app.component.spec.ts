import { TestBed, async } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from 'app/app.component';
import { CoreModule } from 'app/core/core.module';
import { environment } from 'environments/environment';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule,
        CoreModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ],
      providers: [AngularFireAuth],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
