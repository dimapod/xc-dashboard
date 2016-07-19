import {HotDeploymentState} from "../../store/index";
import {HotDeploymentActions} from "./hot-deployment.actions";

const initialState:HotDeploymentState = {
  lamps: [
    {id: "01", color: 255},
    {id: "02", color: 50},
    {id: "03", color: 60},
    {id: "04", color: 100},
    {id: "05", color: 0},
    {id: "06", color: 200},
    {id: "07", color: 150},
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
};

export default (state = initialState, action:any) => {
  switch (action.type) {
    case HotDeploymentActions.LIGHT_STATE:
      return switchLight(state, action);
    case HotDeploymentActions.SERVICE_DEPLOYMENT_START:
      return deployService(state, action);
    case HotDeploymentActions.SERVICE_DEPLOYMENT_END:
      return deployService(state, action);
    default:
      return state;
  }
}

function switchLight(hotDeployment:HotDeploymentState, action):any {
  return Object.assign({}, hotDeployment, {
    lamps: hotDeployment.lamps.map(item => {
      return item.id === action.payload.id ? {
        id: action.payload.id,
        color: calculateColor(action.payload.value)
      } : item;
    })
  });
}

function calculateColor(value:number):number {
  const color = Math.abs(value);
  return color >= 1 ? 255 : value * 255;
}


function deployService(hotDeployment:HotDeploymentState, action):any {
  return Object.assign({}, hotDeployment, {
    services: hotDeployment.services.map(item => {
      return item.id === action.payload.id ? {
        id: action.payload.id,
        version: action.payload.version,
        status: action.type === HotDeploymentActions.SERVICE_DEPLOYMENT_START ? 'START' : 'STOP'
      } : item;
    })
  });
}
