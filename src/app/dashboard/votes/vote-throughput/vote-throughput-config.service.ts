import {Injectable} from "@angular/core";

@Injectable()
export class VoteThroughputConfig {
  options:any = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Title'
    },
    subtitle: {
      text: 'Subtitle'
    },
    xAxis: {
      min: 0,
      max: 30,
      labels: {
        overflow: 'justify'
      }
    },
    yAxis: {},
    plotOptions: {
      spline: {
        lineWidth: 4,
        states: {
          hover: {
            lineWidth: 5
          }
        },
        marker: {
          enabled: false
        }
      }
    },
    series: [
      {
        name: 'Mobile',
        data: []
      },
      {
        name: 'SMS',
        data: []
      },
      {
        name: 'Twitter',
        data: []
      }
    ]
  };
}
