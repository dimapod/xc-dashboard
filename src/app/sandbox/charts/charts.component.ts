import {Component} from "@angular/core";
import {VoteChartComponent} from "../../shared/vote-chart/bar-chart.component";

@Component({
  selector: 'chart-sandbox',
  template: `
    <h1>Charts sandbox</h1>
    <h2>Bar Chart Example</h2>
    <bar-chart-example></bar-chart-example>
  `,
  providers: [],
  directives: [VoteChartComponent],
  pipes: [],
  styles: [``]
})
export class ChartSandboxComponent {
}
