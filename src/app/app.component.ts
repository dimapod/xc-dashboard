import {Component, ViewEncapsulation} from "@angular/core";
import {Home} from "./home";
import {UserService} from "./api/user.service";
import {SocketService} from "./api/socket.service";

@Component({
  selector: 'app',
  pipes: [],
  template: `
    <h2>Component Test</h2>
    <home></home>
    
    <h2>API Test</h2>
    <button (click)="httpTest()">Http Get users from server</button>
    <div *ngFor="let user of users">Name: {{ user.name }} - age: {{ user.age }} - now: {{ user.now }}</div>
    
    <h2>Socket.io Test</h2>
    
    Message: <input [(ngModel)]="message">
    <button (click)="socketTest(message)">Send message to server</button>
    <br>
    <button (click)="socketData.length = 0">Clear</button>
    <div *ngFor="let message of socketData">Socket.io: {{ message }}</div>
  `,
  providers: [UserService, SocketService],
  directives: [Home],
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
  socketData:any = [];
  errorMessage:any;

  constructor(public userService:UserService, public socketService:SocketService) {
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.socketService.onRabbitMessage((data:any) => {
      this.socketData.unshift(JSON.stringify(data));
    });

    this.socketService.onTimeMessage((timeMsg:string) => {
      this.socketData.unshift('Time message - ' + timeMsg);
    });
  }

  httpTest() {
    console.log('Clicked');

    this.userService.getUsers()
      .subscribe(
        users => users.forEach(user => this.users.push(user)),
        error => this.errorMessage = <any>error);
  }

  socketTest(message:string) {
    this.socketService.sendData('Angular: ' + message);
  }

}
