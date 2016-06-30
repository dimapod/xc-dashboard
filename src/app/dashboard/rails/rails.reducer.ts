import {RailsActions} from "./rails.actions";
import {RailsState} from "../../store/index";

const initialState:RailsState = {
  direction: 'left',
  trains: [
    {id:1, position:'pos_1_step_1'},
    {id:2, position:'pos_2_step_1'}
  ]
};


export default (state:RailsState = initialState, action:any) => {
  switch (action.type) {
    case RailsActions.TOGGLE_SWITCH:
      return Object.assign({}, state, state.direction === 'left' ? {direction: 'right'} : {direction: 'left'});  // TODO: Make it enums
    case RailsActions.TRAIN_POSITION:
      return moveTrain(state, action);
    default:
      return state;
  }
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
