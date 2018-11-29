import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';

import { SleepTime } from 'app/sleep-time/shared/sleep-time.model';
import { SleepTimeService } from 'app/sleep-time/shared/sleep-time.service';
import { State } from 'app/sleep-time/shared/state.model';
import { StateColor } from 'app/sleep-time/shared/state-color.model';

declare var google: any;

@Component({
  selector: 'sn-sleep-time-chart',
  templateUrl: './sleep-time-chart.component.html',
  styleUrls: ['./sleep-time-chart.component.scss']
})
export class SleepTimeChartComponent implements OnInit, OnDestroy {
  @Input() sleepTimes: Observable<SleepTime[]>;
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
    this.sleepTimes.subscribe((sleepTimes: SleepTime[]) => {
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
          colors: getColors(sleepTimes),
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

function getColors(sleepTimes: SleepTime[]): string[] {
  const colorCount = 3;
  const colors = [];

  for (const sleepTime of sleepTimes) {
    switch (sleepTime.state) {
      case State.Awake:
        colors.push(StateColor.Awake);
        break;
      case State.Asleep:
        colors.push(StateColor.Asleep);
        break;
      case State.Fussing:
        colors.push(StateColor.Fussing);
        break;
      default:
        // No color for State.Unknown
        break;
    }

    if (colors.length === colorCount) {
      break;
    }
  }

  return colors;
}
