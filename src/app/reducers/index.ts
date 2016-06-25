import * as Redux from 'redux';
const {combineReducers} = Redux;
import rails from '../dashboard/rails/rails.reducer';
import chart from '../shared/vote-chart/chart.reducer';
import {RootState} from "../store";

const rootReducer = combineReducers<RootState>({
  rails, chart
});

export default rootReducer;
