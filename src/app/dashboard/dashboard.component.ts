import {Component, ViewEncapsulation} from "@angular/core";
import {RailsComponent} from "./rails/rails.component";
import {ObstacleComponent} from "./obstacle/obstacle.component";
import {VideoDisplayComponent} from "./video-display/video-display.component";
import {VoteComponent} from "./votes/votes.component";
import {select} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Rx";
import {KeynoteState} from "../store/index";
import {WelcomeComponent} from "./welcome/welcome.component";
import {HotDeploymentComponent} from "./hot-deployment/hot-deployment.component";
import {HighAvailabilityComponent} from "./high-availability/high-availability.component";

@Component({
  selector: 'dashboard',
  template: `
    <rails></rails>
    <welcome *ngIf="status === 'KEYNOTE_BEGIN'"> </welcome>
    <vote *ngIf="status === 'VOTE_STATION' || status === 'VOTE_STATION_RESULT'"></vote>
    <hot-deployment *ngIf="status === 'HOT_DEPLOYMENT'"></hot-deployment>
    <video-display *ngIf="status === 'VIDEO_DISPLAY'"></video-display>
    <high-availability *ngIf="status === 'HIGH_AVAILABILITY'"></high-availability>
    <obstacle></obstacle>
  `,
  providers: [],
  directives: [RailsComponent, WelcomeComponent, VoteComponent, ObstacleComponent, HotDeploymentComponent, VideoDisplayComponent, HighAvailabilityComponent],
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
