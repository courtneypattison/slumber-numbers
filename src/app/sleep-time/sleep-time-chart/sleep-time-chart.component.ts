import { Component, OnInit, OnDestroy } from '@angular/core';

import { untilDestroyed } from 'ngx-take-until-destroy';

import { SleepTime } from '../shared/sleep-time.model';
import { SleepTimeService } from '../shared/sleep-time.service';

declare var google: any;

@Component({
  selector: 'sn-sleep-time-chart',
  templateUrl: './sleep-time-chart.component.html',
  styleUrls: ['./sleep-time-chart.component.css']
})
export class SleepTimeChartComponent implements OnInit, OnDestroy {
  isSleepTime: boolean;
  chart;
  dataTable;
  options;

  constructor(private sleepTimeService: SleepTimeService) { }

  ngOnInit() {
    this.isSleepTime = false;
    this.drawChart();
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.clearChart();
    }
  }

  onResize() {
    if (this.chart && this.dataTable && this.options) {
      this.chart.draw(this.dataTable, this.options);
    }
  }

  drawChart(): void {
    // this.sleepService.addTestSleep();
    this.sleepTimeService.getSleepTimes()
      .pipe(untilDestroyed(this))
      .subscribe((sleepTimes: SleepTime[]) => {
        if (sleepTimes.length) {
          this.isSleepTime = true;
        } else {
          this.isSleepTime = false;
          return;
        }
        const sleepChartRows = this.sleepTimeService.getSleepChartRows(sleepTimes);

        google.charts.load('current', { packages: ['timeline'] });
        google.charts.setOnLoadCallback(() => {
          const container = document.getElementById('sleep-time-chart');
          this.chart = new google.visualization.Timeline(container);
          this.dataTable = new google.visualization.DataTable();
          this.dataTable.addColumn({ type: 'string', id: 'Date' });
          this.dataTable.addColumn({ type: 'string', id: 'State' });
          this.dataTable.addColumn({ type: 'date', id: 'Start' });
          this.dataTable.addColumn({ type: 'date', id: 'End' });
          this.dataTable.addRows(sleepChartRows);

          this.options = {
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
          google.visualization.events.addListener(this.chart, 'ready', function () {
            const labels = container.getElementsByTagName('text');
            Array.prototype.forEach.call(labels, function (label) {
              if (label.getAttribute('text-anchor') === 'middle') {
                label.setAttribute('fill', '#ffffff');
              }
            });
          });

          this.chart.draw(this.dataTable, this.options);
        });
      });
  }
}
