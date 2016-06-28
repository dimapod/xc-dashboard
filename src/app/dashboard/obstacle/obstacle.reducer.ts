import {ObstacleWarningState} from "../../store/index";
import {ObstacleActions} from "./obstacle.actions";

export default (state:ObstacleWarningState={obstacleType:'', isDisplayed:false}, action:any) => {
  switch (action.type) {
    case ObstacleActions.WARNING_DISPLAY:
      return displayWarning(state, action);
    case ObstacleActions.WARNING_DISMISS:
      return hideWarning(state);
    default:
      return state;
  }
}

function displayWarning(state:ObstacleWarningState, action) {
  if(action && action.payload){
    return Object.assign({}, state, {obstacleType:action.payload.obstacleType, isDisplayed:true});
  }
  return state;
}

function hideWarning(state:ObstacleWarningState) {
  return Object.assign({}, state, {obstacleType:'', isDisplayed:false});
}