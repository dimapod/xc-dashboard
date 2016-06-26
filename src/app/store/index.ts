export interface RootState {
  rails:RailsState;
  chart:ChartState;
  votes:VotesState;
}

export interface RailsState {
  direction:string;
}

export interface ChartState {
  votes:Array<number>;
}

export interface VotesState {
  counter:VotesCountState;
  throughput:VotesThroughputState
}

export interface VotesCountState {
  count:number;
}

export interface VotesThroughputState {
}

export class InitialState {
  static getInitialState():RootState {
    return {
      rails: {direction: 'left'},
      chart: {votes: [13, 53]},
      votes: {
        counter: {count: 0},
        throughput: {}
      }
    };
  }
}
