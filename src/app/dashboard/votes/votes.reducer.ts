import {VotesState} from "../../store/index";
import {VotesActions} from "./votes.actions";
import {KeynoteActions} from "../keynote.actions";

export default (state:VotesState = {
  status: undefined,
  distribution: [0, 0],
  counter: {mobile: 10, sms: 20, twitter: 30},
  throughput: {}
}, action:any):VotesState => {
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

function voteState(state:VotesState, action):VotesState {
  if (!action.payload) {
    return state;
  }

  switch (action.payload.value) {
    case KeynoteActions.KEYNOTE_STATE_VOTE_STATION_START:
      return Object.assign({}, state, {status: 'VOTE_STATION'});
    case KeynoteActions.KEYNOTE_STATE_VOTE_STATION_END:
      return Object.assign({}, state, {status: undefined});
    case KeynoteActions.KEYNOTE_STATE_VOTE_TRAIN_ORDER_START:
      return Object.assign({}, state, {status: 'VOTE_TRAIN_ORDER'});
    case KeynoteActions.KEYNOTE_STATE_VOTE_TRAIN_ORDER_END:
      return Object.assign({}, state, {status: undefined});
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
