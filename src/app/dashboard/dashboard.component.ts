import {Component, ViewEncapsulation} from "@angular/core";
import {RailsComponent} from "./rails.component";
import {SimpleHighchartExample} from "../charts/highcharts/simple-chart.component";

@Component({
  selector: 'dashboard',
  template: `
    <h2>Dashboard</h2>
      <rails></rails>
    
      <simple-highchart-example></simple-highchart-example>
  `,
  providers: [],
  directives: [ RailsComponent,SimpleHighchartExample],
  pipes: [],
  encapsulation: ViewEncapsulation.None,
  styles: [``]
})
export class DashboardComponent {

}
