import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'cst-sleep-chart',
  templateUrl: './sleep-chart.component.html',
  styleUrls: ['./sleep-chart.component.css']
})
export class SleepChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    google.charts.load('current', {packages: ['timeline']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      const container = document.getElementById('sleep-chart');
      const chart = new google.visualization.Timeline(container);
      const dataTable = new google.visualization.DataTable();
      dataTable.addColumn({ type: 'string', id: 'Date' });
      dataTable.addColumn({ type: 'string', id: 'State' });
      dataTable.addColumn({ type: 'date', id: 'Start' });
      dataTable.addColumn({ type: 'date', id: 'End' });
      dataTable.addRows([
        [ new Date(2018, 8, 23).toDateString(), 'Asleep', new Date(0, 0, 0, 0, 0), new Date(0, 0, 0, 2, 15) ],
        [ new Date(2018, 8, 23).toDateString(), 'Awake', new Date(0, 0, 0, 2, 15), new Date(0, 0, 0, 2, 45) ],
        [ new Date(2018, 8, 23).toDateString(), 'Asleep', new Date(0, 0, 0, 2, 45), new Date(0, 0, 0, 5, 45) ],
        [ new Date(2018, 8, 23).toDateString(), 'Awake', new Date(0, 0, 0, 5, 45), new Date(0, 0, 0, 8, 20) ],
        [ new Date(2018, 8, 23).toDateString(), 'Asleep', new Date(0, 0, 0, 8, 20), new Date(0, 0, 0, 9, 45) ],
        [ new Date(2018, 8, 23).toDateString(), 'Awake', new Date(0, 0, 0, 9, 45), new Date(0, 0, 0, 13, 0) ],
        [ new Date(2018, 8, 23).toDateString(), 'Asleep', new Date(0, 0, 0, 13, 0), new Date(0, 0, 0, 13, 10) ],
        [ new Date(2018, 8, 23).toDateString(), 'Awake', new Date(0, 0, 0, 13, 10), new Date(0, 0, 0, 15, 15) ],
        [ new Date(2018, 8, 23).toDateString(), 'Asleep', new Date(0, 0, 0, 15, 15), new Date(0, 0, 0, 16, 30) ],
        [ new Date(2018, 8, 23).toDateString(), 'Awake', new Date(0, 0, 0, 16, 30), new Date(0, 0, 0, 20, 30) ],
        [ new Date(2018, 8, 23).toDateString(), 'Asleep', new Date(0, 0, 0, 20, 30), new Date(0, 0, 0, 24, 0) ],

        [ new Date(2018, 8, 24).toDateString(), 'Asleep', new Date(0, 0, 0, 0, 0), new Date(0, 0, 0, 1, 15) ],
        [ new Date(2018, 8, 24).toDateString(), 'Awake', new Date(0, 0, 0, 1, 15), new Date(0, 0, 0, 1, 35) ],
        [ new Date(2018, 8, 24).toDateString(), 'Asleep', new Date(0, 0, 0, 1, 35), new Date(0, 0, 0, 4, 30) ],
        [ new Date(2018, 8, 24).toDateString(), 'Awake', new Date(0, 0, 0, 4, 30), new Date(0, 0, 0, 4, 50) ],
        [ new Date(2018, 8, 24).toDateString(), 'Asleep', new Date(0, 0, 0, 4, 50), new Date(0, 0, 0, 7, 15) ],
        [ new Date(2018, 8, 24).toDateString(), 'Awake', new Date(0, 0, 0, 7, 15), new Date(0, 0, 0, 9, 50) ],
        [ new Date(2018, 8, 24).toDateString(), 'Asleep', new Date(0, 0, 0, 9, 50), new Date(0, 0, 0, 10, 10) ],
        [ new Date(2018, 8, 24).toDateString(), 'Awake', new Date(0, 0, 0, 10, 10), new Date(0, 0, 0, 14, 40) ],
        [ new Date(2018, 8, 24).toDateString(), 'Asleep', new Date(0, 0, 0, 14, 40), new Date(0, 0, 0, 15, 40) ]
      ]);

      const options = {
        avoidOverlappingGridLines: false
      };

      chart.draw(dataTable, options);
    }
  }

}
