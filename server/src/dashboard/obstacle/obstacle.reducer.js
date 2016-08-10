import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  obstacleType: '',
  isDisplayed: false
});


export default (state = initialState, action) => {
  switch (action.type) {
    case 'OBSTACLE_DETECTION':
      return state
        .set('obstacleType', action.payload.obstacleType)
        .set('isDisplayed', true);
    case 'OBSTACLE_CLEARED':
      return state
        .set('obstacleType', '')
        .set('isDisplayed', false);
    default:
      return state;
  }
}
