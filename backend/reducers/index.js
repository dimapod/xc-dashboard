const combineReducers = require('redux').combineReducers;
const reducerTest = require('./reducerTest');

const reducer = combineReducers({
  reducerTest
});

module.exports = reducer;
