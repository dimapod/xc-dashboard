import {Component, ViewEncapsulation} from "@angular/core";
import {RailsComponent} from "./rails/rails.component";
import {VoteCounterComponent} from "./votes/vote-counter/vote-counter.component";
import {ObstacleDisplayComponent} from "./obstacle-warning/obstacle.component";

@Component({
  selector: 'dashboard',
  template: `
    <h2>Dashboard</h2>
    <rails></rails>
    <vote-counter></vote-counter>
    <obstacle-display></obstacle-display>
  `,
  providers: [],
  directives: [RailsComponent, VoteCounterComponent, ObstacleDisplayComponent],
  pipes: [],
  encapsulation: ViewEncapsulation.None,
  styles: [``]
})
export class DashboardComponent {

}
