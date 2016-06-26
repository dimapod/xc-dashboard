import {Component} from "@angular/core";
import {CHART_DIRECTIVES} from 'angular2-highcharts';
import {select} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Observable";
import {VotesState} from "../../../store/index";

@Component({
  selector: 'bar-chart-example',
  directives: [CHART_DIRECTIVES],
  providers: [],
  template: `
      <chart [options]="options" (load)="saveInstance($event.context)"></chart>
      <button (click)="chartActions.vote()">Change values</button>
  `
})
export class VoteCounterComponent {
  // options:Object;
  // chart:any;
  //
  // @select('votes') chart$:Observable<VotesState>;
  //
  // constructor() {
  //   this.options = {
  //     title: {text: 'Votes'},
  //     chart: {
  //       type: 'column'
  //     },
  //     yAxis: {
  //       max: 130
  //     },
  //     xAxis: {
  //       categories: ['Train 1', ' Train 2'],
  //     },
  //     legend: {
  //       enabled: false
  //     },
  //     credits: {
  //       enabled: false
  //     },
  //     series: [{
  //       data: [29.9, 71.5],
  //     }]
  //   };
  // }
  //
  // saveInstance(chartInstance) {
  //   this.chart = chartInstance;
  //
  //   this.chart$.subscribe((state:VotesState) => {
  //     chartInstance.series[0].setData(state.votes);
  //   });
  // }
}
