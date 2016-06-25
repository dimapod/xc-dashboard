import {RailsActions} from "./rails.actions";
import {RailsState} from "../../store/index";

export default (state:RailsState = {direction: 'left'}, action:any) => {
  switch (action.type) {
    case RailsActions.TOGGLE_SWITCH:
      return Object.assign({}, state, state.direction === 'left' ? {direction: 'right'} : {direction: 'left'});  // TODO: Make it enums
    default:
      return state;
  }
}
