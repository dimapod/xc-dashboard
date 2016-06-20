export interface RailsState {
  direction:string;
}

export interface ChartState {
  votes:Array<number>;
}

export interface RootState {
  rails:RailsState;
  chart:ChartState;
}
