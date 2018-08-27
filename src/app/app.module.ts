import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { SleepChartComponent } from './sleep-chart/sleep-chart.component';
import { SleepLogService } from './sleep-log.service';

@NgModule({
  declarations: [
    AppComponent,
    SleepChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [SleepLogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
