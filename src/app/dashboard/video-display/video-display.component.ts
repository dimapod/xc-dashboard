import {Component} from "@angular/core";
import {select} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Observable";
import {VideoDisplayState} from "../../store/index";
import {VideoStreamer} from "./video-streamer.directive";

@Component({
  selector: 'video-display',
  template: `  <div class="video-display-popup">
    <h2>Le train {{trainId}} entre en gare!</h2>
     <video video-streamer width="320" height="240">
      <source src="{{cameraUrl}}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <button (click)="hideVideo()" class="continue-button">Continuer</button>
  </div>`,
  providers: [],
  directives: [VideoStreamer],
  pipes: [],
  styles:  [require('./video-display.component.scss')]
})
export class VideoDisplayComponent {
  name = 'video display';
  trainId:number;
  cameraUrl:string;
  isDisplayed:boolean;

  @select('videoDisplay') videoDisplay$: Observable<VideoDisplayState>;

  constructor() {
    this.isDisplayed=false;
  }

  ngOnInit() {
    this.videoDisplay$.subscribe((data:VideoDisplayState) => {
      this.trainId  = data.trainId;
      this.cameraUrl = data.url;
    });
  }
}
