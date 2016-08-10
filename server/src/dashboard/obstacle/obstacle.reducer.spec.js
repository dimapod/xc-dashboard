import {expect} from 'chai';
import Immutable from 'immutable';
import reducer from './obstacle.reducer';

describe('obstacle reducer', () => {

  it('default state', () => {
    const nextState = reducer(undefined, {type: 'UNKNOWN'});
    expect(nextState.toJS()).to.deep.equal({obstacleType: '', isDisplayed: false});
  });

  it('state not change when unknown action', () => {
    const state = Immutable.fromJS({obstacleType: '', isDisplayed: false});
    const nextState = reducer(state, {type: 'UNKNOWN'});
    expect(nextState).to.equal(state);
  });

  it('action OBSTACLE_DETECTION', () => {
    const state = Immutable.fromJS({obstacleType: '', isDisplayed: false});
    const nextState = reducer(state, {type: 'OBSTACLE_DETECTION', payload: {obstacleType: 'UNICORN'}});
    expect(nextState.toJS()).to.deep.equal({"obstacleType": "UNICORN", isDisplayed: true});
  });

  it('action OBSTACLE_CLEARED', () => {
    const state = Immutable.fromJS({obstacleType: 'UNICORN', isDisplayed: true});
    const nextState = reducer(state, {type: 'OBSTACLE_CLEARED'});
    expect(nextState.toJS()).to.deep.equal({"obstacleType": "", isDisplayed: false});
  });

});
