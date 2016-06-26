import {Injectable} from "@angular/core";
import {NgRedux} from "ng2-redux/lib/index";
import {RootState} from "../../store/index";

@Injectable()
export class ObstacleActions {
  constructor(private ngRedux:NgRedux<RootState>) {
  }

  static WARNING_DISPLAY:string = 'WARNING_DISPLAY';
  static WARNING_DISMISS:string = 'WARNING_DISMISS';


  dismissWarning():void {
    this.ngRedux.dispatch({type: ObstacleActions.WARNING_DISMISS});
  }
}
