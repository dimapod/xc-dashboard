import {Component, ViewEncapsulation} from "@angular/core";
import {SimpleHighchartExample} from "./highcharts/simple-chart.component";

@Component({
  selector: 'chart-shandbox',
  template: `
    <h2>Charts sandbox</h2>
    <h3>Highcharts</h3>
    <simple-highchart-example></simple-highchart-example>
  `,
  providers: [],
  directives: [SimpleHighchartExample],
  pipes: [],
  encapsulation: ViewEncapsulation.None,
  styles: [``]
})
export class ChartSandboxComponent {

  constructor() {
  }

}
