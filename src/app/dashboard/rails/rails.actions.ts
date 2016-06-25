import {Injectable} from "@angular/core";
import {NgRedux} from "ng2-redux/lib/index";
import {RootState} from "../../store/index";

@Injectable()
export class RailsActions {
  constructor(private ngRedux:NgRedux<RootState>) {
  }

  static TOGGLE_SWITCH:string = 'TOGGLE_SWITCH';
  static TRAIN_POSITION:string = 'TRAIN_POSITION';

  toggleSwitch():void {
    this.ngRedux.dispatch({type: RailsActions.TOGGLE_SWITCH});
  }

  trainPosition(trainId:number, position:string):void {
    this.ngRedux.dispatch({type: RailsActions.TRAIN_POSITION, payload: { trainId, position }});
  }
}
