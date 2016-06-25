import * as io from 'socket.io-client';
import Socket = SocketIOClient.Socket;
import {Injectable} from "@angular/core";
import {NgRedux} from "ng2-redux/lib/index";
import {RootState} from "../store/index";
import {Message} from "../models/message";
import {Logger} from "angular2-logger/core";

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
        console.log('msg', msg);


        this.logger.info(msg);
        //this.ngRedux.dispatch(message);
      } else {
        this.logger.warn('Error', msg);
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
