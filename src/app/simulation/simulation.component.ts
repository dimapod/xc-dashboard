import {Component} from  "@angular/core";
import {SocketService} from "../communication/socket.service";
import {Logger} from "angular2-logger/core";
import {SimulationTypeComponent} from "./simulation-type.component";
;
@Component({
  selector: 'simulation',
  providers: [SocketService, Logger],
  directives: [SimulationTypeComponent],
  template: `
    <h1>Simulation</h1>
    <div *ngFor="let type of simulations" class="form-row">
      <simulation-type [message]="type"></simulation-type>
    </div>
`
})
export class SimulationComponent {

  messagesType:Array<string> = ['VOTE_TRAIN', 'OBSTACLE_DETECTION', 'TRAIN_POSITION', 'KEYNOTE_STATE'];
  messageType:string;
  payload:string;
  simulations:Array<MessageType>;

  constructor(public socketService:SocketService, public logger:Logger) {
    this.simulations = new Array();
    this.simulations.push(new MessageType('VOTE_STATION', JSON.stringify({trainId: 1, media: 'MOBILE', count: '1'})));
    this.simulations.push(new MessageType('OBSTACLE_DETECTION', JSON.stringify({obstacle: true, obstacleType: 'COW'})));
    this.simulations.push(new MessageType('OBSTACLE_CLEARED', ''));
    this.simulations.push(new MessageType('TRAIN_POSITION', JSON.stringify({trainId: 1, position: '???'})));
    this.simulations.push(new MessageType('KEYNOTE_STATE', JSON.stringify({state: '<VOTE_ORDER_START | VOTE_TRAIN_END>'})));
  }

  onChoiceType(event) {
    this.logger.debug(this.messagesType);
    switch (this.messageType) {
      case 'VOTE_TRAIN':
        break;
      case 'OBSTACLE':
        break;
      case 'TRAIN_POSITION':
        break;
      case 'KEYNOTE_STATE':
        break;

    }
  }

  send() {
    let data = {type: this.messageType, payload: this.payload};
    this.logger.debug(data);
    this.socketService.pushToServer(data);
  }
}

export class MessageType {

  public type:string;
  public payload:string;

  constructor(type:string, payload:string) {
    this.type = type;
    this.payload = payload;
  }

}
