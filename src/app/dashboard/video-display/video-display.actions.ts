import {Injectable} from "@angular/core";
import {NgRedux} from "ng2-redux/lib/index";
import {RootState} from "../../store/index";

@Injectable()
export class VideoDisplayActions {
  constructor(private ngRedux:NgRedux<RootState>) {
  }

  static VIDEO_DISPLAY:string = 'TRAIN_AT_RANGE';
  static VIDEO_DISMISS:string = 'TRAIN_OUT_OF_RANGE';


  dismissVideo():void {
    this.ngRedux.dispatch({type: VideoDisplayActions.VIDEO_DISMISS});
  }
}
