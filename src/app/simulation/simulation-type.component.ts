import {Component, Input} from "@angular/core";
import {MessageType} from "./simulation.component";
import {SocketService} from "../communication/socket.service";
import {Logger} from "angular2-logger/core";

@Component({
  selector: 'simulation-type',
  providers:[SocketService, Logger],
  template: `
  <form >
    <div class="message" >
          <label>Type : {{message.type}}</label><br/>
          <!--<label>Description : {{message.description}}</label><br/>-->
          <textarea [(ngModel)]="message.payload"  rows="5" cols="60"></textarea>
        <br/>
          <button (click)="send()">send to rabbit</button>
        <br/>
    </div>
    </form>
`,
  styles: [`
    .message{
       border: outset;
       display: inline-block;
       margin-top: 20px;
    }
  `]
})
export class SimulationTypeComponent {

  @Input()
  message:MessageType;

  constructor(public socketService:SocketService, public logger:Logger){

  }


  send() {
    let data = {type: this.message.type, payload: JSON.parse(this.message.payload)};
    this.logger.debug(JSON.stringify(data));
    this.socketService.pushToServer(JSON.stringify(data));
  }

}
