export interface RootState {
  keynoteState:KeynoteState;
  rails:RailsState;
  chart:ChartState;
  votes:VotesState;
  obstacle:ObstacleState;
}

export interface KeynoteState {
  status:string,
}

export class SwitchState{
  switchId:number;
  direction:string;
}
export class TrainState{
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
}

export interface ObstacleState {
  obstacleType:string,
  isDisplayed:boolean,
}
