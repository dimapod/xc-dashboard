import {Component, ViewEncapsulation} from "@angular/core";
import {RailsComponent} from "./rails/rails.component";
import {VoteCounterComponent} from "./votes/vote-counter/vote-counter.component";
import {ObstacleComponent} from "./obstacle/obstacle.component";

@Component({
  selector: 'dashboard',
  template: `
    <h2>Dashboard</h2>
    <rails></rails>
    <vote-counter></vote-counter>
    <obstacle></obstacle>
  `,
  providers: [],
  directives: [RailsComponent, VoteCounterComponent, ObstacleComponent],
  pipes: [],
  encapsulation: ViewEncapsulation.None,
  styles: [``]
})
export class DashboardComponent {

}
