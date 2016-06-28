import {VotesState} from "../../store/index";
import {VotesActions} from "./votes.actions";

export default (state:VotesState = {
  distribution: [0, 0],
  counter: {mobile: 10, sms: 20, twitter: 30},
  throughput: {}
}, action:any) => {
  switch (action.type) {
    case VotesActions.VOTE_STATION:
      return voteTrainChoice(state, action);
    case VotesActions.VOTE_TRAIN_ORDER:
      // TODO
      return state;
    default:
      return state;
  }
}

function voteTrainChoice(state:VotesState, action) {
  let payload:any = action.payload;
  if (payload.media) {
    let media = payload.media.toLowerCase();
    if (state.counter[media] && Number.isInteger(state.counter[media])) {
      let cloneCounter = Object.assign({}, state.counter);
      let delta = (payload.count || 1);
      cloneCounter[media] = cloneCounter[media] + (delta > 0 ? delta : 0);
      return Object.assign({}, state, {counter: cloneCounter});
    }
  }
  return state;
}
