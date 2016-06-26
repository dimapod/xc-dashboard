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
    this.subscribe();
  }

  subscribe() {
    this.socket.on('train', (msg) => {
      let message:Message = new Message(msg.content);
      if (message.isReduxMessage()) {
        this.logger.debug(msg);
        this.ngRedux.dispatch(message);
      } else {
        this.logger.warn('Unknown message type', msg);
      }
    });
  }

  // sendData(data:any) {
  //   this.socket.emit('train', data);
  // }
  //
  // onTimeMessage(fn) {
  //   this.socket.on('time message', fn);
  // }
  //
  // onRabbitMessage(fn) {
  //   this.socket.on('train', fn);
  // }
  //
  // onVoteMessage(fn) {
  //   this.socket.on('vote', fn);
  // }

  getSocket():Socket {
    return this.socket;
  }
}
