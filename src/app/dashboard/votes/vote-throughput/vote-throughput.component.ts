import {Component, Input, ViewEncapsulation} from "@angular/core";
import {CHART_DIRECTIVES} from "angular2-highcharts";
import {VotesCountState} from "../../../store/index";
import {VoteThroughputConfig} from "./vote-throughput-config.service";

@Component({
  selector: 'vote-throughput',
  directives: [CHART_DIRECTIVES],
  providers: [VoteThroughputConfig],
  encapsulation: ViewEncapsulation.None,
  template: `
      <chart [options]="options" (load)="saveInstance($event.context)"></chart>
  `,
  styles: [`
  `]
})
export class VoteThroughputComponent {
  @Input() data:Array<VotesCountState>;

  options:Object;
  chart:any;

  constructor(voteThroughputConfig:VoteThroughputConfig) {
    this.options = voteThroughputConfig.options;
  }

  saveInstance(chartInstance) {
    this.chart = chartInstance;
    this.ngOnChanges();
  }

  ngOnChanges() {
    const mobile = this.data.map(item => item.mobile);
    const sms = this.data.map(item => item.sms);
    const twitter = this.data.map(item => item.twitter);

    if (this.chart) {
      this.chart.series[0].setData(mobile);
      this.chart.series[1].setData(sms);
      this.chart.series[2].setData(twitter);
    }
  }
}
