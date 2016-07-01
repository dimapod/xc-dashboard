import {Component, Input} from "@angular/core";
import {CHART_DIRECTIVES} from "angular2-highcharts";
import {BarChartConfig} from "./bar-chart-config.service";

@Component({
  selector: 'bar-chart',
  directives: [CHART_DIRECTIVES],
  providers: [BarChartConfig],
  template: `
      <chart [options]="options" (load)="saveInstance($event.context)"></chart>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 600px;
        margin: auto;
      }
    `
  ]
})
export class BarChartComponent {
  options:Object;
  chart:any;

  @Input() data:Array<number>;

  constructor(private barChartConfig:BarChartConfig) {
    this.options = barChartConfig.options;
  }

  saveInstance(chartInstance) {
    this.chart = chartInstance;
    this.ngOnChanges();
  }

  ngOnChanges() {
    if (this.chart) {
      this.chart.series[0].setData(this.data);
    }
  }
}
