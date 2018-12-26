import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    BrowserModule.withServerTransition({ appId: 'slumber-numbers' }),
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
