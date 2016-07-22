import {Injectable} from "@angular/core";
import {NgRedux} from "ng2-redux/lib/index";
import {RootState} from "../store/index";

@Injectable()
export class KeynoteActions {
  static KEYNOTE_STATE:string = 'KEYNOTE_STATE';

  // Vote
  static KEYNOTE_STATE_VOTE_STATION_START:string = 'VOTE_STATION_START';
  static KEYNOTE_STATE_VOTE_STATION_END:string = 'VOTE_STATION_END';
  static KEYNOTE_STATE_VOTE_TRAIN_ORDER_START:string = 'VOTE_TRAIN_ORDER_START';
  static KEYNOTE_STATE_VOTE_TRAIN_ORDER_END:string = 'VOTE_TRAIN_ORDER_END';

  // Hot-Deployment
  static KEYNOTE_STATE_HOT_DEPLOYMENT_SHOW:string = 'HOT_DEPLOYMENT_SHOW';
  static KEYNOTE_STATE_HOT_DEPLOYMENT_HIDE:string = 'HOT_DEPLOYMENT_HIDE';

  // Video display
  static KEYNOTE_STATE_VIDEO_DISPLAY_SHOW:string = 'VIDEO_DISPLAY_SHOW';
  static KEYNOTE_STATE_VIDEO_DISPLAY_HIDE:string = 'VIDEO_DISPLAY_HIDE';

  constructor(private ngRedux:NgRedux<RootState>) {
  }

  votesStart():void {
    this.ngRedux.dispatch({
      type: KeynoteActions.KEYNOTE_STATE,
      payload: {state: KeynoteActions.KEYNOTE_STATE_VOTE_STATION_START}
    });
  }

  votesEnd():void {
    this.ngRedux.dispatch({
      type: KeynoteActions.KEYNOTE_STATE,
      payload: {state: KeynoteActions.KEYNOTE_STATE_VOTE_STATION_END}
    });
  }
}
