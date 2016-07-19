const immutable = require('immutable');
const actionsTest = require('../actions/actionTest');

const initialState = immutable.fromJS({
  success: false
});

const reducerTest = function(state = initialState, action) {
  // if (!state) {
  //   state = initialState;
  // }
  switch (action.type) {
    case actionsTest.SUCCESS_TEST:
      return state.mergeDeep(state, action.payload);
    default:
      return state;
  }
};

module.exports = reducerTest;
