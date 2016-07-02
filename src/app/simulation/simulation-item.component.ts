import {Component, Input} from "@angular/core";
import {SocketService} from "../communication/socket.service";
import {Logger} from "angular2-logger/core";
import {SimulationMessage} from "./simulation.model";

@Component({
  selector: 'simulation-item',
  providers: [SocketService, Logger],
  template: `
    <form>
      <div class="message" [ngStyle]="{'background-color': simulation.color}">
        <strong class="message-type">{{simulation.name}}</strong><br/>
        <textarea [(ngModel)]="simulation.json" rows="5" cols="60"></textarea>
        <button (click)="send(simulation.json)">Send to rabbit</button>
      </div>
    </form>
  `,
  styles: [require('./simulation-item.component.scss')]
})
export class SimulationItemComponent {

  @Input()
  simulation:SimulationMessage;

  constructor(public socketService:SocketService, public logger:Logger) {
  }

  send(message:string) {
    this.socketService.pushToServer(message);
  }
}
