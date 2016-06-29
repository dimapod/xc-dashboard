import {VotesState} from "../../store/index";
import {VotesActions} from "./votes.actions";
import {KeynoteActions} from "../keynote.actions";

const initialState:VotesState = {
  status: undefined,
  distribution: [0, 0],
  counter: {mobile: 1, sms: 1, twitter: 1},
  throughput: {}
};

export default (state:VotesState = initialState, action:any):VotesState => {
  switch (action.type) {
    case KeynoteActions.KEYNOTE_STATE:
      return voteState(state, action);
    case VotesActions.VOTE_STATION:
      return voteTrainChoice(state, action);
    case VotesActions.VOTE_TRAIN_ORDER:
      // TODO
      return state;
    default:
      return state;
  }
}

export function voteState(state:any, action):any {
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
    default:
      return state;
  }
}

function voteTrainChoice(state:VotesState, action):VotesState {
  if (state.status !== 'VOTE_STATION' && state.status !== 'VOTE_TRAIN_ORDER') {
    return state;
  }

  let payload:any = action.payload;
  if (payload.media) {
    let media = payload.media.toLowerCase();
    if (state.counter[media] && Number.isInteger(state.counter[media])) {
      let cloneCounter = Object.assign({}, state.counter);
      let delta = (payload.count || 1);
      cloneCounter[media] = cloneCounter[media] + (delta > 0 ? delta : 0);
      return Object.assign({}, state, {counter: cloneCounter});
    }
  }
  return state;
}
