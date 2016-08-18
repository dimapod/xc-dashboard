import Immutable from 'Immutable';

const LIGHT_STATE = 'LIGHT_STATE';
const SERVICE_DEPLOYMENT_START = 'SERVICE_DEPLOYMENT_START';
const SERVICE_DEPLOYMENT_END = 'SERVICE_DEPLOYMENT_END';


const initialState = Immutable.fromJS({
  lamps: [
    {id: "01", color: 1},
    {id: "02", color: 0.6},
    {id: "03", color: 0.2},
    {id: "04", color: 1},
    {id: "05", color: 0},
    {id: "06", color: 0.2},
    {id: "07", color: 0.8},
  ],
  services: [
    {id: 's1', version: 'V1', status: 'STOP'},
    {id: 's2', version: 'V1', status: 'STOP'},
    {id: 's3', version: 'V1', status: 'STOP'},
    {id: 's4', version: 'V1', status: 'STOP'},
    {id: 's5', version: 'V1', status: 'STOP'},
    {id: 's6', version: 'V1', status: 'STOP'},
    {id: 's7', version: 'V1', status: 'STOP'},
  ]
});

export default (state = initialState, action) => {
  switch (action.type) {
    case LIGHT_STATE:
      return switchLight(state, action);
    case SERVICE_DEPLOYMENT_START:
    case SERVICE_DEPLOYMENT_END:
      return deployService(state, action);
    default:
      return state;
  }
}

function switchLight(state, action) {
  return state.updateIn(['lamps',
      state.get('lamps').findIndex((item) => item.get("id") === action.payload.id)],
                    (item) => item.set("color", action.payload.value));
}

function deployService(state, action) {
  return state.updateIn(['services',
      state.get('services').findIndex((item) => item.get("id") === action.payload.id)],
                    (item) => item.set("version", action.payload.version)
                                  .set("status", action.type === SERVICE_DEPLOYMENT_START ? 'START' : 'STOP'));
}
