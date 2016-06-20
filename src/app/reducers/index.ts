import * as Redux from 'redux';
const {combineReducers} = Redux;
import rails from '../dashboard/rails.reducer';
import chart from '../charts/highcharts/chart.reducer';
import {RootState} from "../store";

const rootReducer = combineReducers<RootState>({
  rails, chart
});

export default rootReducer;
