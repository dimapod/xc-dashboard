import {VideoDisplayActions} from "./video-display.actions";
import {VideoDisplayState} from "../../store/index";

const initialState:VideoDisplayState = {
  trainId:1,
  url: 'http://www.xebia.fr/images/header/logo-xebia.svg'
};


export default (state:VideoDisplayState = initialState, action:any) => {
  switch (action.type) {
    case VideoDisplayActions.VIDEO_DISPLAY:
      return updateVideoDisplay(state, action);
    default:
      return state;
  }
}

function updateVideoDisplay(state:VideoDisplayState, action) {
  if(action && action.payload){
    return Object.assign({}, state, {trainId:action.payload.trainId, url:action.payload.url});
  }
  return state;
}


