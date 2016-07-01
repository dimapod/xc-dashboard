import {ChartState} from "../../store/index";
import {ChartActions} from "./chart.actions";

export default (state:ChartState = {votes: []}, action:any) => {
  switch (action.type) {
    case ChartActions.VOTE:
      return Object.assign({}, state, {votes: [action.payload.train1, action.payload.train2]});
    default:
      return state;
  }
}
