import * as Redux from "redux";
import keynoteState from "../dashboard/keynote.reducer";
import rails from "../dashboard/rails/rails.reducer";
import chart from "../shared/vote-chart/chart.reducer";
import votes from "../dashboard/votes/votes.reducer";
import obstacle from "../dashboard/obstacle/obstacle.reducer";
import hotDeployment from "../dashboard/hot-deployment/hot-deployment.reducer";
import videoDisplay from "../dashboard/video-display/video-display.reducer";
import highAvailability from "../dashboard/high-availability/high-availability.reducer";
import {RootState} from "../store";
const {combineReducers} = Redux;

const rootReducer = combineReducers<RootState>({
  keynoteState, rails, chart, votes, obstacle, hotDeployment, videoDisplay,highAvailability
});

export default rootReducer;
