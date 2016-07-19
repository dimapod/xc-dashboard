import {Component, ViewEncapsulation} from "@angular/core";
import {RouteConfig, RouteDefinition} from "@angular/router-deprecated";
import {AsyncPipe} from "@angular/common";
import {NgRedux} from "ng2-redux/lib";
import {Logger} from "angular2-logger/core";
import {RootState} from "./store";
import reducer from "./reducers";
import {SocketService} from "./communication/socket.service";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SimulationComponent} from "./simulation/simulation.component";
import {KitchenSinkComponent} from "./kitchensink/kitchen-sink.component";
const reduxLogger = require('redux-logger');

@Component({
  selector: 'app',
  template: `
    <router-outlet></router-outlet>
  `,
  providers: [SocketService],
  pipes: [AsyncPipe],
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
@RouteConfig([
  {path: '/', name: 'Dashboard', component: DashboardComponent, useAsDefault: true},
  {path: '/simulation', name: 'Simulation', component: SimulationComponent},
  {path: '/kitchensink', name: 'KitchenSink', component: KitchenSinkComponent}
] as RouteDefinition[])
export class App {
  constructor(private ngRedux:NgRedux<RootState>, private logger:Logger,
              private socketService:SocketService) {
    // Logger level
    logger.level = logger.Level.LOG;

    // SocketIO
    socketService.subscribe();
    const windowWrapper:any = window;

    // Redux Store
    let enhancers = [windowWrapper.devToolsExtension ? windowWrapper.devToolsExtension() : f => f];
    this.ngRedux.configureStore(reducer, {} as RootState, [reduxLogger()], enhancers);
  }
}
