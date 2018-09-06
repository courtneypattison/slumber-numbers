import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatNativeDateModule } from '@angular/material/';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

import { SleepFormComponent } from './sleep-form.component';

describe('SleepFormComponent', () => {
  let component: SleepFormComponent;
  let fixture: ComponentFixture<SleepFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatSelectModule,
      ],
      declarations: [SleepFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
