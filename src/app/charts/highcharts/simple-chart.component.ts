import {Component} from "@angular/core";
import {CHART_DIRECTIVES} from 'angular2-highcharts';
import {SocketService} from "../../service/socket.service.ts";

@Component({
  selector: 'simple-highchart-example',
  directives: [CHART_DIRECTIVES],
  providers: [SocketService],
  template: `
      <chart [options]="options" (load)="saveInstance($event.context)"></chart>
      <button (click)="changeValues()">Change values</button>
  `
})
export class SimpleHighchartExample {
  options:Object;
  chart:any;

  constructor(private socketService:SocketService) {
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

  ngOnInit() {
    this.socketService.onVoteMessage((data) => this.receiveVoteMessage(data));
  }

  saveInstance(chartInstance) {
    this.chart = chartInstance;
  }

  changeValues() {
    let data = [1, 2].map(() => Math.random() * 130);
    this.chart.series[0].setData(data);
  }

  //todo refactor
  receiveVoteMessage(data:any) {
    console.log('socket: ' + JSON.stringify(data));
    console.log('content: ' + data.content);
    let content = JSON.parse(data.content);
    this.chart.series[0].setData(content);
  }
}
