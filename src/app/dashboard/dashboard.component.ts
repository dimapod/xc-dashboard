import {Component, ViewEncapsulation} from "@angular/core";
import {RailsComponent} from "./rails.component";

@Component({
  selector: 'dashboard',
  template: `
    <h2>Dashboard</h2>
    
    <rails></rails>
  `,
  providers: [],
  directives: [ RailsComponent ],
  pipes: [],
  encapsulation: ViewEncapsulation.None,
  styles: [``]
})
export class DashboardComponent {
  
}
