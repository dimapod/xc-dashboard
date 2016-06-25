import {Component} from "@angular/core";
import {CHART_DIRECTIVES} from 'angular2-highcharts';
import {SocketService} from "../../communication/socket.service.ts";
import {ChartActions} from "./chart.actions";
import {select} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Observable";
import {ChartState} from "../../store/index";

@Component({
  selector: 'bar-chart-example',
  directives: [CHART_DIRECTIVES],
  providers: [ChartActions],
  template: `
      <chart [options]="options" (load)="saveInstance($event.context)"></chart>
      <button (click)="chartActions.vote()">Change values</button>
  `
})
export class VoteChartComponent {
  options:Object;
  chart:any;

  @select('chart') chart$:Observable<ChartState>;

  constructor(private chartActions:ChartActions) {
    this.options = {
      title: {text: 'Votes'},
      chart: {
        type: 'column'
      },
      yAxis: {
        max: 130
      },
      xAxis: {
        categories: ['Train 1', ' Train 2'],
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

    this.chart$.subscribe((state:ChartState) => {
      chartInstance.series[0].setData(state.votes);
    });
  }
}
