import {Component, ViewEncapsulation} from "@angular/core";
import {Home} from "./home";
import {UserService} from "./user.service";

@Component({
  selector: 'sandbox',
  template: `
    <h2>Component Test</h2>
    <home></home>

    <h2>API Test</h2>
    <button (click)="httpTest()">Http Get users from server</button>
    <div *ngFor="let user of users">Name: {{ user.name }} - age: {{ user.age }} - now: {{ user.now }}</div>

    <h2>Socket.io Test</h2>
    <button (click)="socketData.length = 0">Clear</button>
    <div *ngFor="let message of socketData">Socket.io: {{ message }}</div>
  `,
  providers: [UserService],
  directives: [Home],
  pipes: [],
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
export class SandboxComponent {
  name = 'Angular 2 Webpack Starter';

  users:any = [];
  socketData:any = [];
  errorMessage:any;

  constructor(public userService:UserService) {
  }

  ngOnInit() {
    console.log('ngOnInit');
    // this.socketService.onRabbitMessage((data:any) => {
    //   this.socketData.unshift(JSON.stringify(data));
    // });
    //
    // this.socketService.onTimeMessage((timeMsg:string) => {
    //   this.socketData.unshift('Time message - ' + timeMsg);
    // });
    //this.socketService.onObstacleMessage((obstacleMsg:any) => {
    //  this.socketData.unshift('Obstacle message - ' + obstacleMsg);
    //});
  }

  httpTest() {
    console.log('Clicked');

    this.userService.getUsers()
      .subscribe(
        users => users.forEach(user => this.users.push(user)),
        error => this.errorMessage = <any>error);
  }

  // socketTest(message:string) {
  //   this.socketService.sendData('Angular: ' + message);
  // }

}
