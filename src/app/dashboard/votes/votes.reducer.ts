import {VotesState, VotesThroughputState, VotesCountState} from "../../store/index";
import {VotesActions} from "./votes.actions";
import {KeynoteActions} from "../keynote.actions";

const initialState:VotesState = {
  status: undefined,
  distribution: [0, 0],
  counter: {mobile: 0, sms: 0, twitter: 0},
  throughput: {accumulator: {mobile: 0, sms: 0, twitter: 0}, history: []}
};

export default (state:VotesState = initialState, action:any):VotesState => {
  switch (action.type) {
    case KeynoteActions.KEYNOTE_STATE:
      return voteState(state, action);
    case VotesActions.VOTE_STATION:
      return countVotes(state, action);
    case VotesActions.VOTE_TICK:
      return throughput(state, action);
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

function countVotes(state:VotesState, action):VotesState {
  if (state.status !== 'VOTE_STATION' && state.status !== 'VOTE_TRAIN_ORDER') {
    return state;
  }

  const payload:any = action.payload;
  if (!payload.media) {
    return state;
  }

  const media = payload.media.toLowerCase();
  if (state.counter[media] != undefined && Number.isInteger(state.counter[media])) {
    const increment = (payload.count || 1) > 0 ? (payload.count || 1) : 0;

    // distribution
    const distribution = [state.distribution[0] + (payload.id === 1 ? 1 : 0), state.distribution[1] + (payload.id === 2 ? 1 : 0)];

    // counter
    const counter = Object.assign({}, state.counter);
    counter[media] = counter[media] + increment;

    // throughput
    const accumulator = Object.assign({}, state.throughput.accumulator);
    accumulator[media] = accumulator[media] + increment;
    const throughput = {accumulator, history: state.throughput.history};

    return Object.assign({}, state, {distribution}, {counter}, {throughput});
  }
  return state;
}

function throughput(state:VotesState, action):VotesState {
  const newtItem:VotesCountState = {
    mobile: state.throughput.accumulator.mobile,
    sms: state.throughput.accumulator.sms,
    twitter: state.throughput.accumulator.twitter
  };
  const throughput:VotesThroughputState = {
    accumulator: {mobile: 0, sms: 0, twitter: 0},
    history: [...state.throughput.history, newtItem]
  };

  return Object.assign({}, state, {throughput});
}
