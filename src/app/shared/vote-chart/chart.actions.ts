import {Injectable} from "@angular/core";
import {NgRedux} from "ng2-redux/lib/index";
import {RootState} from "../../store/index";

@Injectable()
export class ChartActions {
  constructor(private ngRedux:NgRedux<RootState>) {
  }

  static VOTE:string = 'VOTE';

  vote():void {
    var payload = {train1: Math.random() * 130, train2: Math.random() * 130};
    this.ngRedux.dispatch({type: ChartActions.VOTE, payload});
  }
}
