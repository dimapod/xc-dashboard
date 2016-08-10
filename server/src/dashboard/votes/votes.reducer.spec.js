import {expect} from 'chai';
import Immutable, {Map, List} from 'immutable';
import reducer from './votes.reducer';

describe('votes reducer', () => {

  it('should return default state', () => {
    const nextState = reducer(undefined, {type: 'UNKNOWN'});
    expect(nextState.get('distribution').toJS()).to.deep.equal([0, 0]);
  });

  it('should update vote status', () => {
    const state = Immutable.fromJS({status: undefined});
    const nextState = reducer(state, {type: 'KEYNOTE_STATE', payload: {value: 'VOTE_STATION_START'}});
    expect(nextState.get('status')).to.equal('VOTE_STATION');
  });

  it('should do nothing when status is not VOTE_STATION', () => {
    const state = Immutable.fromJS({status: undefined, counter: {mobile: 0, sms: 0, twitter: 0}, distribution: [0, 0]});
    const nextState = reducer(state, {type: 'VOTE_STATION', payload: {media: 'mobile'}});
    expect(nextState.get('counter').toJS()).to.deep.equal({mobile: 0, sms: 0, twitter: 0});
  });

  it('should increment counter for mobile +1', () => {
    const state = Immutable.fromJS({status: 'VOTE_STATION', counter: {mobile: 0, sms: 0, twitter: 0}, distribution: [0, 0]});
    const nextState = reducer(state, {type: 'VOTE_STATION', payload: {media: 'mobile'}});
    expect(nextState.get('counter')).to.deep.equal(Map({mobile: 1, sms: 0, twitter: 0}));
  });

  it('should increment counter for mobile +count', () => {
    const state = Immutable.fromJS({status: 'VOTE_STATION', counter: {mobile: 1, sms: 0, twitter: 0}, distribution: [0, 0]});
    const nextState = reducer(state, {type: 'VOTE_STATION', payload: {media: 'mobile', count: 3}});
    expect(nextState.get('counter')).to.deep.equal(Map({mobile: 4, sms: 0, twitter: 0}));
  });

  it('should increment counter for sms +count', () => {
    const state = Immutable.fromJS({status: 'VOTE_STATION', counter: {mobile: 1, sms: 8, twitter: 0}, distribution: [0, 0]});
    const nextState = reducer(state, {type: 'VOTE_STATION', payload: {media: 'sms', count: 2}});
    expect(nextState.get('counter')).to.deep.equal(Map({mobile: 1, sms: 10, twitter: 0}));
  });

  it('should do nothing when unknown media', () => {
    const state = Immutable.fromJS({status: 'VOTE_STATION', counter: {mobile: 1, sms: 8, twitter: 0}, distribution: [0, 0]});
    const nextState = reducer(state, {type: 'VOTE_STATION', payload: {media: 'unknown', count: 2}});
    expect(nextState.get('counter')).to.deep.equal(Map({mobile: 1, sms: 8, twitter: 0}));
  });

  it('should increment distribution item N0', () => {
    const state = Immutable.fromJS({status: 'VOTE_STATION', counter: {mobile: 1, sms: 0, twitter: 0}, distribution: [2, 3] });
    const nextState = reducer(state, {type: 'VOTE_STATION', payload: {id: 0, media: 'mobile', count: 3}});
    expect(nextState.get('distribution')).to.deep.equal(List.of(5, 3));
  });

  it('should increment distribution item N1', () => {
    const state = Immutable.fromJS({status: 'VOTE_STATION', counter: {mobile: 1, sms: 0, twitter: 0}, distribution: [2, 3] });
    const nextState = reducer(state, {type: 'VOTE_STATION', payload: {id: 1, media: 'mobile', count: 3}});
    expect(nextState.get('distribution')).to.deep.equal(List.of(2, 6));
  });

  it('should increment throughput counter for mobile +1', () => {
    const state = Immutable.fromJS({status: 'VOTE_STATION', counter: {mobile: 1, sms: 0, twitter: 0}, distribution: [2, 3], throughput: {accumulator: {mobile: 2, sms: 1, twitter: 0}, history: []} });
    const nextState = reducer(state, {type: 'VOTE_STATION', payload: {id: 1, media: 'mobile'}});
    expect(nextState.getIn(['throughput', 'accumulator'])).to.deep.equal(Map({mobile: 3, sms: 1, twitter: 0}));
  });

  it('should increment throughput counter for sms +count', () => {
    const state = Immutable.fromJS({status: 'VOTE_STATION', counter: {mobile: 1, sms: 0, twitter: 0}, distribution: [2, 3], throughput: {accumulator: {mobile: 2, sms: 1, twitter: 0}, history: []} });
    const nextState = reducer(state, {type: 'VOTE_STATION', payload: {id: 1, media: 'sms', count: 4}});
    expect(nextState.getIn(['throughput', 'accumulator'])).to.equal(Map({mobile: 2, sms: 5, twitter: 0}));
    expect(nextState.getIn(['throughput', 'history'])).to.equal(List([]));
  });

  it('should update history on vote tick', () => {
    const state = Immutable.fromJS({status: 'VOTE_STATION', counter: {mobile: 4, sms: 2, twitter: 8}, distribution: [2, 3], throughput: {accumulator: {mobile: 2, sms: 1, twitter: 3}, history: []} });
    const nextState = reducer(state, {type: 'VOTE_TICK'});
    expect(nextState.getIn(['throughput', 'accumulator'])).to.equal(Map({mobile: 0, sms: 0, twitter: 0}));
    expect(nextState.getIn(['throughput', 'history'])).to.deep.equal(Immutable.fromJS([{ "mobile": 2, "sms": 1, "twitter": 3 }]));
  });

});
