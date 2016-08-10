export class SimulationMessage {
  public name:string;
  public color:string;
  public message:KeynoteMessage;
  public json:string;
}

export class KeynoteMessage {
  public type:string;
  public payload:any;

  constructor(type:string, payload:any) {
    this.type = type;
    this.payload = payload;
  }
}
