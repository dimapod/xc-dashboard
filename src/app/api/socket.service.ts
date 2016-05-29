import * as io from 'socket.io-client';
import Socket = SocketIOClient.Socket;

export class SocketService {

  socket:Socket;

  constructor() {
    this.socket = io.connect('http://localhost:8001');
  }

  sendData(data:any) {
    this.socket.emit('push', data);
  }

  onTimeMessage(cb) {
    this.socket.on('time message', cb);
  }

  onRabbitMessage(cb) {
    this.socket.on('push', cb);
  }

  getSocket():Socket {
    return this.socket;
  }

}
