import { Component, OnInit } from '@angular/core';

import { SleepService } from '../shared/sleep.service';

declare var google: any;

@Component({
  selector: 'sl-sleep-chart',
  templateUrl: './sleep-chart.component.html',
  styleUrls: ['./sleep-chart.component.css']
})
export class SleepChartComponent implements OnInit {
  sleepRows: [string, string, Date, Date];

  constructor(private sleepService: SleepService) { }

  ngOnInit() {
    google.charts.load('current', {packages: ['timeline']});
    google.charts.setOnLoadCallback(drawChart);

    this.sleepService.addTestSleep();
    const sleepChartRows = this.sleepService.getSleepChartRows();

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
  }

}
