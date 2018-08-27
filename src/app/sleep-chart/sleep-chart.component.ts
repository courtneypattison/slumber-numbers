import { Component, OnInit } from '@angular/core';

import { SleepLogService } from '../sleep-log.service';

declare var google: any;

@Component({
  selector: 'sl-sleep-chart',
  templateUrl: './sleep-chart.component.html',
  styleUrls: ['./sleep-chart.component.css']
})
export class SleepChartComponent implements OnInit {
  sleepRows: [string, string, Date, Date];

  constructor(private sleepLogService: SleepLogService) { }

  ngOnInit() {
    google.charts.load('current', {packages: ['timeline']});
    google.charts.setOnLoadCallback(drawChart);
    const sleepArray = this.sleepLogService.getSleepLog().map(sleepRecord => {
      const recordArray = Object.values(sleepRecord);
      recordArray.unshift(recordArray[0].toDateString());
      return recordArray;
    });
    function drawChart() {
      const container = document.getElementById('sleep-chart');
      const chart = new google.visualization.Timeline(container);
      const dataTable = new google.visualization.DataTable();
      dataTable.addColumn({ type: 'string', id: 'Date' });
      dataTable.addColumn({ type: 'string', id: 'State' });
      dataTable.addColumn({ type: 'date', id: 'Start' });
      dataTable.addColumn({ type: 'date', id: 'End' });
      dataTable.addRows(sleepArray);

      const options = {
        avoidOverlappingGridLines: false
      };

      chart.draw(dataTable, options);
    }
  }

}
