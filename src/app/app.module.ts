import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SleepChartComponent } from './sleep-chart/sleep-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SleepChartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
