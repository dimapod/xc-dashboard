export class Message {
  type:string;
  payload:any;

  constructor(strMessage:string) {
    Object.assign(this, JSON.parse(strMessage));
  }

  isReduxMessage() {
    return !!this.type;
  }
}
