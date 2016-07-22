import {RailsActions} from "./rails.actions";
import {RailsState} from "../../store/index";

const initialState:RailsState = {
  switchDirections: [
    {switchId:1, direction:'left'},
    {switchId:2, direction:'right'}
  ],
  trains: [
    {id:1, position:'pos_1_step_1'},
    {id:2, position:'pos_2_step_1'}
  ]
};


export default (state:RailsState = initialState, action:any) => {
  switch (action.type) {
    case RailsActions.TOGGLE_SWITCH:
      return toggleSwitches(state, action);
    case RailsActions.TRAIN_POSITION:
      return moveTrain(state, action);
    default:
      return state;
  }
}

function toggleSwitches(state:RailsState, action) {

  if(action && action.payload){
    var updatedTrainStates = state.switchDirections.map((railSwitch) => {
      if(railSwitch.switchId===action.payload.switchId){
        return Object.assign({}, railSwitch, {direction:action.payload.direction});
      }
      return railSwitch;
    });
    state = Object.assign({}, state, {switchDirections: updatedTrainStates});
  }
  return state;
}
function moveTrain(state:RailsState, action) {

  if(action && action.payload){
    var updatedTrainStates = state.trains.map((train) => {
      if(train.id===action.payload.trainId){
        return Object.assign({}, train, {position:action.payload.position});
      }
      return train;
    });
    state = Object.assign({}, state, {trains: updatedTrainStates});
  }
  return state;
}
