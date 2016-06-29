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

export interface RailsState {
  direction:string;
}

export interface ChartState {
  votes:Array<number>;
}

export interface VotesState {
  status:string,
  distribution:Array<number>,
  counter:VotesCountState;
  throughput:VotesThroughputState
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
