import {KeynoteActions} from "./keynote.actions";
import {KeynoteState} from "../store/index";

const initialState:KeynoteState = {
  status: 'KEYNOTE_BEGIN',
};

export default (state:KeynoteState = initialState, action:any):KeynoteState => {
  switch (action.type) {
    case KeynoteActions.KEYNOTE_STATE:
      return handleState(state, action);
    default:
      return state;
  }
}

export function handleState(state:any, action):any {
  if (!action.payload) {
    return state;
  }
  switch (action.payload.value) {
    case KeynoteActions.KEYNOTE_STATE_VOTE_STATION_START:
      return Object.assign({}, state, {status: 'VOTE_STATION'});
    case KeynoteActions.KEYNOTE_STATE_VOTE_STATION_END:
      return Object.assign({}, state, {status: 'VOTE_STATION_RESULT'});
    case KeynoteActions.KEYNOTE_STATE_VOTE_TRAIN_ORDER_START:
      return Object.assign({}, state, {status: 'VOTE_TRAIN_ORDER'});
    case KeynoteActions.KEYNOTE_STATE_VOTE_TRAIN_ORDER_END:
      return Object.assign({}, state, {status: 'VOTE_TRAIN_ORDER_RESULT'});
    case KeynoteActions.KEYNOTE_STATE_HOT_DEPLOYMENT_SHOW:
      return Object.assign({}, state, {status: 'HOT_DEPLOYMENT'});
    case KeynoteActions.KEYNOTE_STATE_HOT_DEPLOYMENT_HIDE:
      return Object.assign({}, state, {status: 'HOT_DEPLOYMENT_STOP'});
    case KeynoteActions.KEYNOTE_STATE_VIDEO_DISPLAY_SHOW:
      return Object.assign({}, state, {status: 'VIDEO_DISPLAY'});
    case KeynoteActions.KEYNOTE_STATE_VIDEO_DISPLAY_HIDE:
      return Object.assign({}, state, {status: 'VIDEO_DISPLAY_STOP'});
    case KeynoteActions.KEYNOTE_STATE_HIGH_AVAILABILITY_SHOW:
      return Object.assign({}, state, {status: 'HIGH_AVAILABILITY'});
    case KeynoteActions.KEYNOTE_STATE_HIGH_AVAILABILITY_HIDE:
      return Object.assign({}, state, {status: ''});
    default:
      return state;
  }
}
