import Immutable from 'Immutable';

const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const TRAIN_POSITION = 'TRAIN_POSITION';

const initialState = Immutable.fromJS({
  switchDirections: [
    {switchId: 1, direction: 'left'},
    {switchId: 2, direction: 'right'}
  ],
  trains: [
    {id: 1, position: 'pos_1_step_1'},
    {id: 2, position: 'pos_2_step_1'}
  ]
});


export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SWITCH:
      return toggleSwitches(state, action);
    case TRAIN_POSITION:
      return moveTrain(state, action);
    default:
      return state;
  }
}

function toggleSwitches(state, action) {

  if (action && action.payload) {
    const switchDirections = state.get('switchDirections');
    return state.set('switchDirections', switchDirections.update(
      switchDirections.findIndex((item) => item.get("switchId") === action.payload.switchId),
      (item) => item.set("direction", action.payload.direction)));
  }
  return state;
}

function moveTrain(state, action) {

  if (action && action.payload) {
    const trains = state.get('trains');
    return state.set('trains', trains.update(
      trains.findIndex((item) => item.get("id") === action.payload.trainId),
      (item) => item.set("position", action.payload.position)));
  }
  return state;
}
