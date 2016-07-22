export interface RootState {
  keynoteState:KeynoteState;
  rails:RailsState;
  chart:ChartState;
  votes:VotesState;
  obstacle:ObstacleState;
  hotDeployment:HotDeploymentState;
  videoDisplay:VideoDisplayState;
}

export interface KeynoteState {
  status:string
}

export class SwitchState {
  switchId:number;
  direction:string;
}
export class TrainState {
  id:number;
  position:string;
}

export interface RailsState {
  switchDirections:Array<SwitchState>;
  trains:Array<TrainState>
}

export interface ChartState {
  votes:Array<number>;
}

export interface VotesState {
  status:string,
  distribution:Array<number>,
  counter:VotesCountState;
  throughput:VotesThroughputState,
}

export interface VotesCountState {
  mobile:number;
  sms:number;
  twitter:number;
}

export interface VotesThroughputState {
  accumulator:VotesCountState;
  history:Array<VotesCountState>;
}

export interface ObstacleState {
  obstacleType:string,
  isDisplayed:boolean,
}

export interface VideoDisplayState {
  trainId:number,
  url:string
}

export interface HotDeploymentState {
  lamps:Array<LampState>;
  services:Array<ServiceState>;
}

export interface LampState {
  id:string,
  color:number,
}

export interface ServiceState {
  id:string,
  version:string,
  status:string
}


