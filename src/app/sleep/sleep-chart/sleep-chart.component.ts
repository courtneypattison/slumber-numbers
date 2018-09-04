import { Component, OnInit } from '@angular/core';

import { untilDestroyed } from 'ngx-take-until-destroy';

import { SleepService } from '../shared/sleep.service';
import { SleepChartRow } from '../shared/sleep-chart-row.model';

declare var google: any;

@Component({
  selector: 'sl-sleep-chart',
  templateUrl: './sleep-chart.component.html',
  styleUrls: ['./sleep-chart.component.css']
})
export class SleepChartComponent implements OnInit {
  sleepRows: SleepChartRow;

  constructor(private sleepService: SleepService) { }

  ngOnInit() {
    this.drawChart();
  }

  drawChart(): void {
    // this.sleepService.addTestSleep();
    this.sleepService.getSleepLog()
      .pipe(untilDestroyed(this))
      .subscribe(sleepLog => {
        const sleepChartRows = this.sleepService.getSleepChartRows(sleepLog);

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
  }
}
