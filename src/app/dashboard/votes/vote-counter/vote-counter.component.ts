import {Component} from "@angular/core";
import {CHART_DIRECTIVES} from 'angular2-highcharts';
import {select} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Observable";
import {VotesState, VotesCountState} from "../../../store/index";
import {VoteCounterChart} from "./vote-counter.service";

@Component({
  selector: 'vote-counter',
  directives: [CHART_DIRECTIVES],
  providers: [VoteCounterChart],
  template: `
      <chart [options]="options" (load)="saveInstance($event.context)"></chart>
  `
})
export class VoteCounterComponent {
  options:Object;
  chart:any;

  @select('votes') votes$:Observable<VotesState>;

  constructor(voteCounterChart:VoteCounterChart) {
    this.options = voteCounterChart.options;
  }

  saveInstance(chartInstance) {
    this.chart = chartInstance;

    this.votes$
      .map((state:VotesState) => state.counter)
      .subscribe((state:VotesCountState) => {
        chartInstance.series[0].setData([state.mobile]);
        chartInstance.series[1].setData([state.sms]);
        chartInstance.series[2].setData([state.twitter]);
      });
  }
}
