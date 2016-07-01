import {Injectable} from "@angular/core";
import {Highcharts} from "angular2-highcharts";

@Injectable()
export class BarChartConfig {
  options:any = {
    title: {text: 'Votes'},
    chart: {
      type: 'column'
    },
    yAxis: {
    },
    xAxis: {
      categories: ['Station 1', ' Station 2'],
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    series: [{
      data: [0, 0],
    }]
  };
}
