import Socket = SocketIOClient.Socket;


export class SocketService {

  socket:Socket;

  constructor() {
    this.socket = io.connect('http://localhost:8001');
  }

  initialiazeReciever(wsData:any) {
    this.socket.on('push', (data:any) => {
      console.log('server push ', JSON.stringify(data));
      wsData.push(JSON.stringify(data));
    });
  }

  sendData(data:any) {
    this.socket.emit('push', data);
  }

}
