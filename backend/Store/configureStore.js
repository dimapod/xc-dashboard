const createStore = require('redux').createStore;
const applyMiddleware = require('redux').applyMiddleware;
const createLogger = require('redux-logger');
const reducer = require('../reducers/index');

const logger = createLogger({
  collapsed: true,
  predicate: () => process.env.NODE_ENV === 'development' // eslint-disable-line no-unused-vars
});

const configureStore = function(initialState) {
  return createStore(reducer, initialState, applyMiddleware(logger));
};

module.exports = configureStore;
