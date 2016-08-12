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

const combinedReducer = combineReducers<RootState>({
  keynoteState, rails, chart, votes, obstacle, hotDeployment, videoDisplay, highAvailability
});

export default (state:RootState, action:any):RootState => {
  switch (action.type) {
    case 'SET_STATE':
      return Object.assign({}, state, action.payload);
    default:
      return combinedReducer(state, action);
  }
};
