import {expect} from 'chai';
import Immutable from 'immutable';
import reducer from './video-display.reducer';

describe('video reducer', () => {

  const initialState = Immutable.fromJS({
    trainId: 1,
    url: 'http://www.xebia.fr/images/header/logo-xebia.svg'
  });

  it('default state', () => {
    const nextState = reducer(undefined, {type: 'UNKNOWN'});
    expect(nextState.toJS()).to.deep.equal(initialState.toJS());
  });

  it('should update video display', () => {
    const nextState1 = reducer(initialState, {type: 'UPDATE_VIDEO_DISPLAY', payload: {trainId: 2, url: 'http://toto.fr'}});
    const nextState2 = reducer(nextState1, {type: 'UPDATE_VIDEO_DISPLAY', payload: {trainId: 1, url: 'http://test.fr'}});
    expect(nextState1.toJS()).to.deep.equal({
      trainId: 2,
      url: 'http://toto.fr'
    });
    expect(nextState2.toJS()).to.deep.equal({
      trainId: 1,
      url: 'http://test.fr'
    });
  });
});
