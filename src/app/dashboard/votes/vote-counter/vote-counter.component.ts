import {Component, Input} from "@angular/core";
import {CHART_DIRECTIVES} from "angular2-highcharts";
import {VotesCountState} from "../../../store/index";
import {VoteCounterChart} from "./vote-counter.service";

@Component({
  selector: 'vote-counter',
  directives: [CHART_DIRECTIVES],
  providers: [VoteCounterChart],
  template: `
    <div class="vote-counter-chart">
      <chart [options]="options" (load)="saveInstance($event.context)"></chart>
    </div>
  `,
  styles: [``]
})
export class VoteCounterComponent {
  @Input() data:VotesCountState;

  options:Object;
  chart:any;

  constructor(voteCounterChart:VoteCounterChart) {
    this.options = voteCounterChart.options;
  }

  saveInstance(chartInstance) {
    this.chart = chartInstance;
    this.ngOnChanges();
  }

  ngOnChanges() {
    if (this.chart) {
      this.chart.series[0].setData([this.data.mobile]);
      this.chart.series[1].setData([this.data.sms]);
      this.chart.series[2].setData([this.data.twitter]);
    }
  }
}
