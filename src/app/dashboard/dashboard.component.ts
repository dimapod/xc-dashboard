import {Component, ViewEncapsulation} from "@angular/core";
import {VoteChartComponent} from "../shared/vote-chart/bar-chart.component";
import {RailsComponent} from "./rails/rails.component";

@Component({
  selector: 'dashboard',
  template: `
    <h2>Dashboard</h2>
      <rails></rails>
      <bar-chart-example></bar-chart-example>
  `,
  providers: [],
  directives: [RailsComponent, VoteChartComponent],
  pipes: [],
  encapsulation: ViewEncapsulation.None,
  styles: [``]
})
export class DashboardComponent {

}
