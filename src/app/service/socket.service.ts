import * as io from 'socket.io-client';
import Socket = SocketIOClient.Socket;

export class SocketService {

  socket:Socket;

  constructor() {
    this.socket = io.connect('http://localhost:8001');
  }

  sendData(data:any) {
    this.socket.emit('train', data);
  }

  onTimeMessage(fn) {
    this.socket.on('time message', fn);
  }

  onRabbitMessage(fn) {
    this.socket.on('train', fn);
  }

  onVoteMessage(fn){
    this.socket.on('vote', fn);
  }

  getSocket():Socket {
    return this.socket;
  }

}
