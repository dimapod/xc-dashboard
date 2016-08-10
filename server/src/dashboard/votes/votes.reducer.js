import {Map, fromJS} from 'immutable';
import {handleState} from "../keynote.reducer";

const initialState = fromJS({
  status: undefined,
  distribution: [0, 0],
  counter: {mobile: 0, sms: 0, twitter: 0},
  throughput: {accumulator: {mobile: 0, sms: 0, twitter: 0}, history: []}
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'KEYNOTE_STATE':
      return handleState(state, action);
    case 'VOTE_STATION':
      return countVotes(state, action);
    case 'VOTE_TICK':
      return throughput(state, action);
    default:
      return state;
  }
}

function countVotes(state, action) {
  if (state.get('status') !== 'VOTE_STATION') {
    return state;
  }

  const payload = action.payload;
  if (!payload.media) {
    return state;
  }

  const media = payload.media.toLowerCase();
  if (state.getIn(['counter', media]) != undefined) {
    const increment = (payload.count || 1) > 0 ? (payload.count || 1) : 0;
    return state
      .updateIn(['counter', media], val => val + increment)
      .updateIn(['distribution', (payload.id === 1 ? 1 : 0)], val => val + increment)
      .updateIn(['throughput', 'accumulator', media], val => val + increment);
  }
  return state;
}

function throughput(state, action) {
  return state
    .updateIn(['throughput', 'history'], val => val.push(state.getIn(['throughput', 'accumulator'])))
    .setIn(['throughput', 'accumulator'], Map({mobile: 0, sms: 0, twitter: 0}));
}
