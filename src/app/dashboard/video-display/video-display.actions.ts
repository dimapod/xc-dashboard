import {Injectable} from "@angular/core";
import {NgRedux} from "ng2-redux/lib/index";
import {RootState} from "../../store/index";

@Injectable()
export class VideoDisplayActions {
  constructor(private ngRedux:NgRedux<RootState>) {
  }

  static VIDEO_DISPLAY:string = 'UPDATE_VIDEO_DISPLAY';

}
