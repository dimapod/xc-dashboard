import {expect} from 'chai';
import {fromJS} from 'immutable';
import reducer from './keynote.reducer';

describe('keynote reducer', () => {

  it('default state', () => {
    const nextState = reducer(undefined, {type: 'UNKNOWN'});
    expect(nextState.toJS()).to.deep.equal({status: 'KEYNOTE_BEGIN'});
  });

  it('state not change when unknown action', () => {
    const state = fromJS({status: 'KEYNOTE_BEGIN'});
    const nextState = reducer(state, {type: 'UNKNOWN', payload: {value: 'VOTE_STATION_START'}});
    expect(nextState).to.equal(state);
  });

  it('application state: VOTE_STATION_START', () => {
    const state = fromJS({status: 'KEYNOTE_BEGIN'});
    const nextState = reducer(state, {type: 'KEYNOTE_STATE', payload: {value: 'VOTE_STATION_START'}});
    expect(nextState.toJS()).to.deep.equal({"status": "VOTE_STATION"});
  });

  it('application state: VOTE_STATION_END', () => {
    const state = fromJS({status: 'VOTE_STATION_START'});
    const nextState = reducer(state, {type: 'KEYNOTE_STATE', payload: {value: 'VOTE_STATION_END'}});
    expect(nextState.toJS()).to.deep.equal({"status": "VOTE_STATION_RESULT"});
  });

});
