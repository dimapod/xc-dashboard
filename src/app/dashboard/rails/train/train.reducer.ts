import {TrainsState} from "../../../store/index";
import {TrainActions} from "./train.actions";

export default (state:TrainsState=[
    {id:'01', position:'pos_1_step_1', color:'url(#mx-gradient-ffcd28-1-ffa500-1-s-0)'},
    {id:'02', position:'pos_2_step_1', color:'url(#mx-gradient-e1d5e7-1-8c6c9c-1-s-0)'}
  ], action:any) => {
  switch (action.type) {
    case TrainActions.TRAIN_POSITION:
      return moveTrain(state, action);
    default:
      return state;
  }
}

function moveTrain(state:TrainsState, action) {
  if(action && action.payload){
    state = state.map((train) => {
      if(train.id===action.payload.trainId){
        return Object.assign({}, train, {position:action.payload.position});
      }
      return train;
    });
  }
  return state;
}

