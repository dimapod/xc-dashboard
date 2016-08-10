import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  nodes: []
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'K8S_STATUS':
      return state.set('nodes', action.payload);
    default:
      return state;
  }
}
