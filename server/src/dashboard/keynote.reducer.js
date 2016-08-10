import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  status: 'KEYNOTE_BEGIN'
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'KEYNOTE_STATE':
      return handleState(state, action);
    default:
      return state;
  }
}

export function handleState(state, action) {
  if (!action.payload) {
    return state;
  }
  switch (action.payload.value) {
    case 'VOTE_STATION_START':
      return state.set('status', 'VOTE_STATION');
    case 'VOTE_STATION_END':
      return state.set('status', 'VOTE_STATION_RESULT');
    case 'VOTE_TRAIN_ORDER_START':
      return state.set('status', 'VOTE_TRAIN_ORDER');
    case 'VOTE_TRAIN_ORDER_END':
      return state.set('status', 'VOTE_TRAIN_ORDER_RESULT');
    case 'HOT_DEPLOYMENT_SHOW':
      return state.set('status', 'HOT_DEPLOYMENT');
    case 'HOT_DEPLOYMENT_HIDE':
      return state.set('status', 'HOT_DEPLOYMENT_STOP');
    case 'VIDEO_DISPLAY_SHOW':
      return state.set('status', 'VIDEO_DISPLAY');
    case 'VIDEO_DISPLAY_HIDE':
      return state.set('status', 'VIDEO_DISPLAY_STOP');
    case 'HIGH_AVAILABILITY_SHOW':
      return state.set('status', 'HIGH_AVAILABILITY');
    case 'HIGH_AVAILABILITY_HIDE':
      return state.set('status', '');
    default:
      return state;
  }
}
