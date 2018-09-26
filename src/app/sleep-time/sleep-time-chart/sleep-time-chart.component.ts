import { Component, OnInit } from '@angular/core';

import { untilDestroyed } from 'ngx-take-until-destroy';

import { SleepTimeService } from '../shared/sleep-time.service';
import { SleepTime } from '../shared/sleep-time.model';

declare var google: any;

@Component({
  selector: 'sn-sleep-time-chart',
  templateUrl: './sleep-time-chart.component.html',
  styleUrls: ['./sleep-time-chart.component.css']
})
export class SleepTimeChartComponent implements OnInit {

  constructor(private sleepTimeService: SleepTimeService) { }

  ngOnInit() {
    this.drawChart();
  }

  drawChart(): void {
    // this.sleepService.addTestSleep();
    this.sleepTimeService.getSleepTimes()
      .pipe(untilDestroyed(this))
      .subscribe((sleepTimes: SleepTime[]) => {
        const sleepChartRows = this.sleepTimeService.getSleepChartRows(sleepTimes);
        if (sleepChartRows.length === 0) {
          return;
        }

        google.charts.load('current', { packages: ['timeline'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
          const container = document.getElementById('sleep-time-chart');
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
              '#69F0AE', // Awake
              '#7b1fa2', // Asleep
              '#f44336', // Crying
            ],
            timeline: {
              showBarLabels: false,
              rowLabelStyle: { color: '#fff' },
            },
            backgroundColor: '#303030',
          };

          // Colour horizontal axis white
          google.visualization.events.addListener(chart, 'ready', function () {
            const labels = container.getElementsByTagName('text');
            Array.prototype.forEach.call(labels, function (label) {
              if (label.getAttribute('text-anchor') === 'middle') {
                label.setAttribute('fill', '#ffffff');
              }
            });
          });

          chart.draw(dataTable, options);
        }
      });
  }
}
