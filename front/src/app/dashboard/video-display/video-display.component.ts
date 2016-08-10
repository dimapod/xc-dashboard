import {Component} from "@angular/core";
import {select} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Observable";
import {VideoDisplayState} from "../../store/index";

@Component({
  selector: 'video-display',
  template: `<div class="video-display-popup">
    <h2>Le train {{trainId}} entre en gare!</h2>
      <img src="{{cameraUrl}}">
  </div>`,
  providers: [],
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
