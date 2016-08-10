import {combineReducers} from 'redux-immutable';
import keynoteState from './dashboard/keynote.reducer';
import highAvailability from './dashboard/high-availability/high-availability.reducer';
import obstacle from './dashboard/obstacle/obstacle.reducer';
import votes from './dashboard/votes/votes.reducer';

export default combineReducers({
  keynoteState, highAvailability, obstacle, votes
});


