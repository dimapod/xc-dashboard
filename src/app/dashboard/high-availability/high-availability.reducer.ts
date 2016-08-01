
import {HighAvailabilityState} from "./kubernetes.model";
import {HighAvailabilityActions} from "./high-availability.actions";

const initialState:HighAvailabilityState = {
  nodes: []
};

export default (state:HighAvailabilityState = initialState, action:any):HighAvailabilityState => {
  switch (action.type) {
    case HighAvailabilityActions.K8S_STATUS:
      return handleState(state, action);
    default:
      return state;
  }
}

function handleState(state:HighAvailabilityState, action:any):HighAvailabilityState {
  return Object.assign({}, {nodes: action.payload});
}
