import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AccountRoutingModule } from './account/account-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { SleepTimeRoutingModule } from './sleep-time/sleep-time-routing.module';

import { AppComponent } from './app.component';
import { ErrorDialogComponent } from './shared/error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    CoreModule,
    SharedModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,

    AccountRoutingModule,
    AppRoutingModule,
    AuthRoutingModule,
    SleepTimeRoutingModule,
  ],
  entryComponents: [ErrorDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
