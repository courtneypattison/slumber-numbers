import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { untilDestroyed } from 'ngx-take-until-destroy';

import { first } from 'rxjs/operators';

import { SleepService } from '../shared/sleep.service';
import { SleepChartRow } from '../shared/sleep-chart-row.model';
import { Sleep } from '../shared/sleep.model';

declare var google: any;

@Component({
  selector: 'sl-sleep-chart',
  templateUrl: './sleep-chart.component.html',
  styleUrls: ['./sleep-chart.component.css']
})
export class SleepChartComponent implements OnInit {
  sleepRows: SleepChartRow;

  constructor(private sleepService: SleepService, public angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.drawChart();
  }

  drawChart(): void {
    // this.sleepService.addTestSleep();
    this.angularFireAuth.authState.pipe(first()).subscribe(user => {
      this.sleepService.getSleepLog(user.uid)
        .pipe(untilDestroyed(this))
        .subscribe((sleepLog: Sleep[]) => {
          const sleepChartRows = this.sleepService.getSleepChartRows(sleepLog);
          if (sleepChartRows.length === 0) {
            return;
          }

          google.charts.load('current', { packages: ['timeline'] });
          google.charts.setOnLoadCallback(drawChart);

          function drawChart() {
            const container = document.getElementById('sleep-chart');
            const chart = new google.visualization.Timeline(container);
            const dataTable = new google.visualization.DataTable();
            dataTable.addColumn({ type: 'string', id: 'Date' });
            dataTable.addColumn({ type: 'string', id: 'State' });
            dataTable.addColumn({ type: 'date', id: 'Start' });
            dataTable.addColumn({ type: 'date', id: 'End' });
            dataTable.addRows(sleepChartRows);

            const options = {
              avoidOverlappingGridLines: false,
              colors: [
                '#FFCA28', // Awake
                '#7E57C2', // Asleep
                '#EF5350', // Crying
              ],
              timeline: { showBarLabels: false }
            };

            chart.draw(dataTable, options);
          }
        });
    });
  }
}
