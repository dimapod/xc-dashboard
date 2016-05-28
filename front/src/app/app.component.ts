import {Component, ViewEncapsulation} from "@angular/core";
import {Home} from "./home";
import {UserService} from "./api/user.service";
import {SocketService} from "./api/socket.service";
import Socket = SocketIOClient.Socket;

@Component({
  selector: 'app',
  pipes: [],
  template: `
    <div>{{ name }}</div>
    <home></home>
    <child #child1></child>
    <child #child2></child>
    
    <h2>Users</h2>
    <button (click)="onClick()">API Test</button>
    <div *ngFor="let user of users">Name: {{ user.name }} - age: {{ user.age }} - now: {{ user.now }}</div>
    
    <h2>WS Events</h2>
    <button (click)="wsTest()">WS Test</button>
    <div *ngFor="let ws of wsData">From WebSocket: {{ ws }}</div>
  `,
  providers: [ UserService, SocketService],
  directives: [ Home ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    `
    html, body {
      height: 100%;
    }
    `
  ]
})
export class App {
  name = 'Angular 2 Webpack Starter';

  users:any = [];
  wsData:any = [];
  errorMessage:any;

  socket:Socket;


  constructor(public userService:UserService, public socketService:SocketService) {
  }

  ngOnInit() {
    console.log('ngOnInit')
    this.socketService.initialiazeReciever(this.wsData);
  }

  onClick() {
    console.log('Clicked');

    this.userService.getUsers()
      .subscribe(
        users => users.forEach(user => this.users.push(user)),
        error => this.errorMessage = <any>error);
  }

  wsTest() {
    this.socketService.sendData('Hello Angular');
  }

}
