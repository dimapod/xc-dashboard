import {Injectable} from "@angular/core";
import {Highcharts} from "angular2-highcharts";

@Injectable()
export class VoteCounterChart {
  options:any = {
    title: {text: 'Votes'},
    chart: {
      type: 'column',
      width: 300
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {text: null},
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
        }
      }
    },
    xAxis: {
      categories: ['Total Votes'],
    },
    legend: {
      align: 'right',
      x: -10,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: false,
          // color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
          // style: {
          //   textShadow: '0 0 3px black'
          // }
        }
      }
    },
    series: [
      {
        name: 'Mobile',
        data: [0],
      },
      {
        name: 'SMS',
        data: [0],
      },
      {
        name: 'Twitter',
        data: [0],
      }
    ]
  };
}
