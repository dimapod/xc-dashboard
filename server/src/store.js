import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import Immutable from 'immutable';
//const reduxLogger = require('redux-logger');
import createLogger from 'redux-node-logger';

const logger = createLogger({
});

export default function makeStore() {
  return createStore(reducer, Immutable.fromJS({}), applyMiddleware(logger));
}
