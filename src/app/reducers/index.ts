import * as Redux from 'redux';
const {combineReducers} = Redux;
import rails from '../dashboard/rails.reducer';
import {RootState} from "../store";

const rootReducer = combineReducers<RootState>({
  rails
});

export default rootReducer;
