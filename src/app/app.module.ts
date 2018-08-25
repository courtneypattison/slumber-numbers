import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SleepChartComponent } from './sleep-chart/sleep-chart.component';
import { SleepService } from './sleep.service';

@NgModule({
  declarations: [
    AppComponent,
    SleepChartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [SleepService],
  bootstrap: [AppComponent]
})
export class AppModule { }
