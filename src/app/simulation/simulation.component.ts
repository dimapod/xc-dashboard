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
    this.simulations.push(new MessageType('VOTE_TRAIN_CHOICE', '{\\"trainId\\" : \\"<trainId>\\", \\"media\\": \\"<MOBILE | SMS |TWITTER>\\", \\"count\\": <1>}', ''));
    this.simulations.push(new MessageType('OBSTACLE_DETECTION', '{\\"obstacle\\" : \\"true|false\\", \\"obstacleType\\": \\"<COW | RABBIT | PONEY>\\"}', ''));
    this.simulations.push(new MessageType('OBSTACLE_CLEARED', '', ''));
    this.simulations.push(new MessageType('TRAIN_POSITION', '{\\"trainId\\" : \\"<trainId>\\", \\"position\\": \\"<position>\\"}', ''));
    this.simulations.push(new MessageType('KEYNOTE_STATE', '{\\"state\\": \\"<VOTE_ORDER_START | VOTE_TRAIN_END>\\"}', ''));
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
  public description:string;
  public payload:string;

  constructor(type:string, description:string, payload:string) {
    this.type = type;
    this.description = description;
    this.payload = payload;
  }

}
