import {combineReducers} from 'redux-immutable';
import keynoteState from './dashboard/keynote.reducer';
import highAvailability from './dashboard/high-availability/high-availability.reducer';
import obstacle from './dashboard/obstacle/obstacle.reducer';
import votes from './dashboard/votes/votes.reducer';
import hotDeployment from './dashboard/hot-deployment/hot-deployment.reducer';

export default combineReducers({
  keynoteState, highAvailability, obstacle, votes, hotDeployment
});


