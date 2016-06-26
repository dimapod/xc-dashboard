import * as Redux from "redux";
import rails from "../dashboard/rails/rails.reducer";
import chart from "../shared/vote-chart/chart.reducer";
import votes from "../dashboard/votes/votes.reducer";
import {RootState} from "../store";
const {combineReducers} = Redux;

const rootReducer = combineReducers<RootState>({
  rails, chart, votes
});

export default rootReducer;
