import {Component} from "@angular/core";
import {CHART_DIRECTIVES} from 'angular2-highcharts';

@Component({
  selector: 'simple-highchart-example',
  directives: [CHART_DIRECTIVES],
  template: `
      <chart [options]="options" (load)="saveInstance($event.context)"></chart>
      <button (click)="changeValues()">Change values</button>
  `
})
export class SimpleHighchartExample {
  options:Object;
  chart:any;

  constructor() {
    this.options = {
      title: {text: 'Votes'},
      chart: {
        type: 'column'
      },
      yAxis: {
        max: 130
      },
      xAxis: {
        categories: ['Asia', 'Europe'],
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        data: [29.9, 71.5],
      }]
    };
  }

  saveInstance(chartInstance) {
    this.chart = chartInstance;
  }

  changeValues() {
    let data = [1, 2].map(() => Math.random() * 130);
    this.chart.series[0].setData(data);
  }

}
