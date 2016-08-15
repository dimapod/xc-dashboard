import {expect} from 'chai';
import Immutable from 'immutable';
import reducer from './rails.reducer';

describe('rails reducer', () => {

  const initialState = Immutable.fromJS({
    switchDirections: [
      {switchId: 1, direction: 'left'},
      {switchId: 2, direction: 'right'}
    ],
    trains: [
      {id: 1, position: 'pos_1_step_1'},
      {id: 2, position: 'pos_2_step_1'}
    ]
  });

  it('default state', () => {
    const nextState = reducer(undefined, {type: 'UNKNOWN'});
    expect(nextState.toJS()).to.deep.equal(initialState.toJS());
  });

  it('should switch rails direction', () => {
    const nextState1 = reducer(initialState, {type: 'TOGGLE_SWITCH', payload: {switchId: 2, direction: 'left'}});
    const nextState2 = reducer(nextState1, {type: 'TOGGLE_SWITCH', payload: {switchId: 1, direction: 'right'}});
    expect(nextState1.get('switchDirections').toJS()).to.deep.equal([
      {switchId: 1, direction: 'left'},
      {switchId: 2, direction: 'left'}
    ]);
    expect(nextState2.get('switchDirections').toJS()).to.deep.equal([
      {switchId: 1, direction: 'right'},
      {switchId: 2, direction: 'left'}
    ]);
  });

  it('should move train', () => {
    const nextState1 = reducer(initialState, {type: 'TRAIN_POSITION', payload: {trainId: 2, position: 'pos_1_step_4'}});
    const nextState2 = reducer(nextState1, {type: 'TRAIN_POSITION', payload: {trainId: 1, position: 'pos_2_step_5'}});
    expect(nextState1.get('trains').toJS()).to.deep.equal([
      {id: 1, position: 'pos_1_step_1'},
      {id: 2, position: 'pos_1_step_4'}
    ]);
    expect(nextState2.get('trains').toJS()).to.deep.equal([
      {id: 1, position: 'pos_2_step_5'},
      {id: 2, position: 'pos_1_step_4'}
    ]);
  });

});
