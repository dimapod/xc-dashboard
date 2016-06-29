import {Component, ViewEncapsulation} from "@angular/core";
import {RailsComponent} from "./rails/rails.component";
import {ObstacleComponent} from "./obstacle/obstacle.component";
import {VoteComponent} from "./votes/votes.component";
import {select} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Rx";
import {KeynoteState} from "../store/index";
import {WelcomeComponent} from "./welcome/welcome.component";

@Component({
  selector: 'dashboard',
  template: `
    <rails></rails>
    <welcome *ngIf="status === 'KEYNOTE_BEGIN'"> </welcome>
    <vote *ngIf="status === 'VOTE_STATION'"></vote>
    <obstacle></obstacle>
  `,
  providers: [],
  directives: [RailsComponent, WelcomeComponent, VoteComponent, ObstacleComponent],
  pipes: [],
  encapsulation: ViewEncapsulation.None,
  styles: [``]
})
export class DashboardComponent {
  @select('keynoteState') keynoteState$:Observable<KeynoteState>;
  status:string;
  constructor() {
    this.keynoteState$
      .map((state:KeynoteState) => state.status)
      .subscribe(status => this.status = status)
  }
}
