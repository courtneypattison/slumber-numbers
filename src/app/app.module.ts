import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AccountRoutingModule } from 'app/account/account-routing.module';
import { AppComponent } from 'app/app.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { AuthRoutingModule } from 'app/auth/auth-routing.module';
import { CoreModule } from 'app/core/core.module';
import { environment } from 'environments/environment';
import { SleepTimeRoutingModule } from 'app/sleep-time/sleep-time-routing.module';
import { ErrorDialogComponent } from 'app/shared/error-dialog/error-dialog.component';
import { SharedModule } from 'app/shared/shared.module';

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
