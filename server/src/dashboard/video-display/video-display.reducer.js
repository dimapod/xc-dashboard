import Immutable from "Immutable";

const VIDEO_DISPLAY = 'UPDATE_VIDEO_DISPLAY';

const initialState = Immutable.fromJS({
  trainId: 1,
  url: 'http://www.xebia.fr/images/header/logo-xebia.svg'
});


export default (state = initialState, action) => {
  switch (action.type) {
    case VIDEO_DISPLAY:
      return updateVideoDisplay(state, action);
    default:
      return state;
  }
}

function updateVideoDisplay(state, action) {
  if (action && action.payload) {
    return state.set('trainId', action.payload.trainId)
                .set('url', action.payload.url);
  }
  return state;
}


