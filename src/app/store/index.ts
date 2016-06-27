export interface RootState {
  rails:RailsState;
  chart:ChartState;
  votes:VotesState;
  obstacle:ObstacleState;
}

export interface RailsState {
  direction:string;
}

export interface ChartState {
  votes:Array<number>;
}

export interface VotesState {
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

export class InitialState {
  static getInitialState():RootState {
    return {
      rails: {direction: 'left'},
      chart: {votes: [13, 53]},
      votes: {
        distribution: [0, 0],
        counter: {mobile: 10, sms: 20, twitter: 30},
        throughput: {}
      },
      obstacle:{obstacleType:'', isDisplayed:false}
    };
  }
}
