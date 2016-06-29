import {Injectable} from "@angular/core";
import {NgRedux} from "ng2-redux/lib/index";
import {RootState} from "../../store/index";

@Injectable()
export class VotesActions {
  static VOTE_STATION:string = 'VOTE_STATION';
  static VOTE_TRAIN_ORDER:string = 'VOTE_TRAIN_ORDER';

  constructor(private ngRedux:NgRedux<RootState>) {
  }

  voteStation(payload):void {
    this.ngRedux.dispatch({type: VotesActions.VOTE_STATION, payload});
  }

  trainOrderVote(payload):void {
    this.ngRedux.dispatch({type: VotesActions.VOTE_TRAIN_ORDER, payload});
  }

}
