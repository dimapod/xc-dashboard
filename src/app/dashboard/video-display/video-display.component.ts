import {Component} from "@angular/core";
import {select} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Observable";
import {RailsState} from "../../store/index";
import {VideoDisplayActions} from "./video-display.actions";
import {VideoStreamer} from "./video-streamer.directive";

@Component({
  selector: 'video-display',
  template: `  <div class="video-display-popup" *ngIf="isDisplayed">
    <h2>Le train {{trainId}} entre en gare!</h2>
     <video video-streamer width="320" height="240">
      <source src="{{cameraUrl}}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <button (click)="dismissVideo()" class="continue-button">Continuer</button>
  </div>`,
  providers: [VideoDisplayActions],
  directives: [VideoStreamer],
  pipes: [],
  styles:  [require('./video-display.component.scss')]
})
export class VideoDisplayComponent {
  name = 'video display';
  trainId:number;
  cameraUrl:string;
  isDisplayed:boolean;

  static coveredPositions: Array<any> = [
    {positionRef : 'pos_0_step_2', cameraUrl:'assets/screencast-git-2-3.mp4'}
  ];

  @select('rails') rails$: Observable<RailsState>;

  constructor( private videoDisplayActions:VideoDisplayActions) {
    this.isDisplayed=false;
  }

  ngOnInit() {
    this.rails$.subscribe((data:RailsState) => {
      var matchingPosition = VideoDisplayComponent.coveredPositions.filter((coveredPos) => {
        return((data.trains[0].id!==this.trainId)&&(coveredPos.positionRef===data.trains[0].position)) ||
          ((data.trains[1].id!==this.trainId)&&(coveredPos.positionRef===data.trains[1].position));
      })[0];
      if(!!matchingPosition){
        this.trainId  = (data.trains[0].id===this.trainId)?data.trains[1].id: data.trains[0].id;
        this.cameraUrl = matchingPosition.cameraUrl;
        this.isDisplayed = true;
      }
    });
  }

  dismissVideo(){
    this.isDisplayed=false;
  }

}
