import * as Redux from "redux";
import rails from "../dashboard/rails/rails.reducer";
import chart from "../shared/vote-chart/chart.reducer";
import votes from "../dashboard/votes/votes.reducer";
import obstacleWarning from "../dashboard/obstacle-warning/obstacle.reducer";
import {RootState} from "../store";
const {combineReducers} = Redux;

const rootReducer = combineReducers<RootState>({
  rails, chart, votes, obstacleWarning
});

export default rootReducer;
