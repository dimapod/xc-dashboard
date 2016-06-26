import {Component} from  "@angular/core";
import {SocketService} from "../communication/socket.service";
import {Logger} from "angular2-logger/core";
;
@Component({
  selector: 'simulation',
  providers: [SocketService, Logger],
  template: `
    <h1>Simulation</h1>
    <form >
    <label for="type">Type :</label>
     <select [(ngModel)]="messageType" (change)="onChoiceType($event)" required  #messageControl="ngForm">
        <option *ngFor="let type of messagesType" [value]="type" required>{{type}}</option>
     </select>
     <div [hidden]="!messageControl.valid">
          <label for="payload">payload</label>
          <textarea [(ngModel)]="payload"  rows="5" cols="60"></textarea>
        
        <br/>
          <button (click)="send()">send to rabbit</button>
        <br/>
     </div>
     
    </form>`
})
export class SimulationComponent {

  messagesType:Array<string> = ['VOTE_TRAIN', 'OBSTACLE_DETECTION', 'TRAIN_POSITION', 'KEYNOTE_STATE'];
  messageType:string;
  payload:string;

  constructor(public socketService:SocketService,public logger:Logger) {

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
