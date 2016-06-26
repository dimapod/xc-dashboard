import {Injectable} from "@angular/core";
import {Highcharts} from "angular2-highcharts";

@Injectable()
export class VoteCounterChart {
  options:any = {
    title: {text: 'Votes'},
    chart: {
      type: 'column'
    },
    yAxis: {
      min: 0,
      max: 100,
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
      x: -30,
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
          enabled: true,
          color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
          style: {
            textShadow: '0 0 3px black'
          }
        }
      }
    },
    series: [
      {
        name: 'Mobile',
        data: [24],
      },
      {
        name: 'SMS',
        data: [10],
      },
      {
        name: 'Twitter',
        data: [18],
      }
    ]
  };
}
