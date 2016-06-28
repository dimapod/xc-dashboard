import {KeynoteActions} from "./keynote.actions";
import {KeynoteState} from "../store/index";

export default (state:KeynoteState = {value: undefined}, action:any) => {
  switch (action.type) {
    case KeynoteActions.KEYNOTE_STATE:
      // TODO: manage state
      return state;

    default:
      return state;
  }
}
