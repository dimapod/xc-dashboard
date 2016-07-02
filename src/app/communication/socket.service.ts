import * as io from "socket.io-client";
import {Injectable} from "@angular/core";
import {NgRedux} from "ng2-redux/lib/index";
import {RootState} from "../store/index";
import {Logger} from "angular2-logger/core";
import Socket = SocketIOClient.Socket;
import {Message} from "./message";

@Injectable()
export class SocketService {
  socket:Socket;

  constructor(private ngRedux:NgRedux<RootState>, private logger:Logger) {
    this.socket = io.connect('http://localhost:8001');
  }

  subscribe() {
    this.socket.on('dashboard', (msg) => {
      let message:any = JSON.parse(msg.content);
      if (message.type) {
        this.ngRedux.dispatch(message);
      } else {
        this.logger.warn('Unknown message type', msg);
      }
    });
  }

  pushToServer(data:any) {
    this.socket.emit('dashboard', data);
  }
}
