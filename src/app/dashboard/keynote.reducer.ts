import {KeynoteActions} from "./keynote.actions";
import {KeynoteState} from "../store/index";
import {voteState} from "./votes/votes.reducer";

const initialState:KeynoteState = {
  status: 'KEYNOTE_BEGIN',
};

export default (state:KeynoteState = initialState, action:any):KeynoteState => {
  switch (action.type) {
    case KeynoteActions.KEYNOTE_STATE:
      return voteState(state, action);
    default:
      return state;
  }
}
