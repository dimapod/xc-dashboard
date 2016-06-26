import {Component, ViewEncapsulation} from "@angular/core";
import {RailsComponent} from "./rails/rails.component";
import {VoteCounterComponent} from "./votes/vote-counter/vote-counter.component";

@Component({
  selector: 'dashboard',
  template: `
    <h2>Dashboard</h2>
    <rails></rails>
    <vote-counter></vote-counter>
  `,
  providers: [],
  directives: [RailsComponent, VoteCounterComponent],
  pipes: [],
  encapsulation: ViewEncapsulation.None,
  styles: [``]
})
export class DashboardComponent {

}
