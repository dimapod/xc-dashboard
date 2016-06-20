import {RailsActions} from "./rails.actions";

export default (state:string = 'left', action:any) => {
  switch (action.type) {
    case RailsActions.TOGGLE_SWITCH:
      return state === 'left' ? 'right' : 'left';  // Make it enums
    default:
      return state;
  }
}
