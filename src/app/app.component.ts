/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';

import {Home} from './home';
import {AppState} from './app.service';
import {RouterActive} from './router-active';
import {UserService} from "./api/user.service";
import {$WebSocket} from 'angular2-websocket/angular2-websocket'

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [],
  providers: [UserService],
  directives: [RouterActive],
  encapsulation: ViewEncapsulation.None,
  styles: [
    ``
  ],
  template: `
    <div>{{name}}</div>
    <button (click)="onClick()">API Test</button>
    <h2>Users</h2>
    <div *ngFor="let user of users">Name: {{ user.name }} - age: {{ user.age }} - now: {{ user.now }}</div>
    <h2>WS Events</h2>
    <button (click)="wsTest()">WS Test</button>
    <div *ngFor="let ws of wsData">From WebSocket: {{ ws }}</div>
  `
})
@RouteConfig([
  {path: '/', name: 'Index', component: Home, useAsDefault: true},
  {path: '/home', name: 'Home', component: Home},
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  {path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About')}
])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  loading = false;
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

  users:any = [];
  errorMessage:any;
  wsData:any = [];
  ws:$WebSocket;

  constructor(public appState:AppState, public userService:UserService) {
    this.ws = new $WebSocket("ws://localhost:8001");
  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);

    this.ws.onMessage(event => {
      console.log('message: ', event);
      this.wsData.push(event.data);
    }, {});
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

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
