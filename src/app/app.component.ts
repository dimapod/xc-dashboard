import {Component, ViewEncapsulation} from "@angular/core";
import {Home} from './home';
import {UserService} from "./api/user.service";
import {$WebSocket} from 'angular2-websocket/angular2-websocket'

@Component({
  selector: 'app',
  pipes: [],
  template: `
    <div>{{ name }}</div>
    <home></home>
    
    <h2>Users</h2>
    <button (click)="onClick()">API Test</button>
    <div *ngFor="let user of users">Name: {{ user.name }} - age: {{ user.age }} - now: {{ user.now }}</div>
    
    <h2>WS Events</h2>
    <button (click)="wsTest()">WS Test</button>
    <div *ngFor="let ws of wsData">From WebSocket: {{ ws }}</div>
  `,
  providers: [ UserService ],
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

  ws:$WebSocket;

  users:any = [];
  wsData:any = [];
  errorMessage:any;

  constructor(public userService:UserService) {
    this.ws = new $WebSocket("ws://localhost:8001");
  }

  ngOnInit() {
    console.log('ngOnInit');

    this.ws.onOpen(event => {
      console.log('onOpen: ', event);
    });

    this.ws.onMessage(event => {
      console.log('onMessage: ', event);
      this.wsData.push(event.data);
    }, {});

    this.ws.connect();
  }

  onClick() {
    console.log('Clicked');

    this.userService.getUsers()
      .subscribe(
        users => users.forEach(user => this.users.push(user)),
        error => this.errorMessage = <any>error);
  }

  wsTest() {
    this.ws.send('Hello from Angular2');
  }

}
