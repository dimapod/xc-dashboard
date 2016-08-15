import {expect} from 'chai';
import Immutable, {Map, List} from 'immutable';
import reducer from './hot-deployment.reducer';

describe('hot deployment reducer', () => {

  const initialState = Immutable.fromJS({
    lamps: [
      {id: "01", color: 1},
      {id: "02", color: 0.6},
      {id: "03", color: 0.2},
    ],
    services: [
      {id: 's1', version: 'V1', status: 'STOP'},
      {id: 's2', version: 'V1', status: 'STOP'},
      {id: 's3', version: 'V1', status: 'STOP'},
    ]
  });

  it('should return default state', () => {
    const nextState = reducer(undefined, {type: 'UNKNOWN'});
    expect(nextState.get('lamps').toJS()).to.deep.equal([
      {id: "01", color: 1},
      {id: "02", color: 0.6},
      {id: "03", color: 0.2},
      {id: "04", color: 1},
      {id: "05", color: 0},
      {id: "06", color: 0.2},
      {id: "07", color: 0.8},
    ]);

    expect(nextState.get('services').toJS()).to.deep.equal([
      {id: 's1', version: 'V1', status: 'STOP'},
      {id: 's2', version: 'V1', status: 'STOP'},
      {id: 's3', version: 'V1', status: 'STOP'},
      {id: 's4', version: 'V1', status: 'STOP'},
      {id: 's5', version: 'V1', status: 'STOP'},
      {id: 's6', version: 'V1', status: 'STOP'},
      {id: 's7', version: 'V1', status: 'STOP'},
    ]);
  });

  it('should update lamps luminosity', () => {
    const nextStateLamps2 = reducer(initialState, {type: "LIGHT_STATE", payload: {id: "02", value: 1}});
    const nextStateLamps3 = reducer(nextStateLamps2, {type: "LIGHT_STATE", payload: {id: "03", value: 0.0}});

    expect(nextStateLamps2.get('lamps').toJS()).to.deep.equal([
      {id: "01", color: 1},
      {id: "02", color: 1},
      {id: "03", color: 0.2}]);

    expect(nextStateLamps3.get('lamps').toJS()).to.deep.equal([
      {id: "01", color: 1},
      {id: "02", color: 1},
      {id: "03", color: 0.0}]);
  });

  it('should update service version', () => {
    const nextStateService1 = reducer(initialState, {type: "SERVICE_DEPLOYMENT_START", payload: {id: 's1', version: 'V2'}});
    const nextStateService3 = reducer(nextStateService1, {type: "SERVICE_DEPLOYMENT_START", payload: {id: 's3', version: 'V2'}});
    const nextStateStopService3 = reducer(nextStateService3, {type: "SERVICE_DEPLOYMENT_END", payload: {id: 's3', version: 'V2'}});
    const nextStateStopService1 = reducer(nextStateStopService3, {type: "SERVICE_DEPLOYMENT_END", payload: {id: 's1', version: 'V2'}});
    const nextStateService2 = reducer(nextStateStopService1, {type: "SERVICE_DEPLOYMENT_END", payload: {id: 's2', version: 'V2'}});

    expect(nextStateService1.get('services').toJS()).to.deep.equal([
      {id: 's1', version: 'V2', status: 'START'},
      {id: 's2', version: 'V1', status: 'STOP'},
      {id: 's3', version: 'V1', status: 'STOP'}]);

    expect(nextStateService3.get('services').toJS()).to.deep.equal([
      {id: 's1', version: 'V2', status: 'START'},
      {id: 's2', version: 'V1', status: 'STOP'},
      {id: 's3', version: 'V2', status: 'START'}]);

    expect(nextStateStopService3.get('services').toJS()).to.deep.equal([
      {id: 's1', version: 'V2', status: 'START'},
      {id: 's2', version: 'V1', status: 'STOP'},
      {id: 's3', version: 'V2', status: 'STOP'}]);

    expect(nextStateStopService1.get('services').toJS()).to.deep.equal([
      {id: 's1', version: 'V2', status: 'STOP'},
      {id: 's2', version: 'V1', status: 'STOP'},
      {id: 's3', version: 'V2', status: 'STOP'}]);

    expect(nextStateService2.get('services').toJS()).to.deep.equal([
      {id: 's1', version: 'V2', status: 'STOP'},
      {id: 's2', version: 'V2', status: 'STOP'},
      {id: 's3', version: 'V2', status: 'STOP'}]);
  });
});
