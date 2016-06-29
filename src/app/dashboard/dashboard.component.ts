import {Component, ViewEncapsulation} from "@angular/core";
import {RailsComponent} from "./rails/rails.component";
import {ObstacleComponent} from "./obstacle/obstacle.component";
import {VoteComponent} from "./votes/votes.component";

@Component({
  selector: 'dashboard',
  template: `
    <h2>Dashboard</h2>
    <rails></rails>
    <vote></vote>
    <obstacle></obstacle>
  `,
  providers: [],
  directives: [RailsComponent, VoteComponent, ObstacleComponent],
  pipes: [],
  encapsulation: ViewEncapsulation.None,
  styles: [``]
})
export class DashboardComponent {

}
