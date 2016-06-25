import {Component, ViewEncapsulation} from "@angular/core";
import {RouteConfig} from "@angular/router-deprecated";
import {AsyncPipe} from "@angular/common";
import {NgRedux} from "ng2-redux/lib";
import {Logger} from "angular2-logger/core";
import {RootState} from "./store";
import reducer from './reducers';
import {SocketService} from "./communication/socket.service";
import {SandboxComponent} from "./sandbox/sandbox.component";
import {ChartSandboxComponent} from "./sandbox/charts/charts.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

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
  {path: '/sandbox', name: 'Sandbox', component: SandboxComponent},
  {path: '/charts', name: 'Charts', component: ChartSandboxComponent}
])
export class App {
  constructor(private ngRedux:NgRedux<RootState>, private logger:Logger) {

    logger.level = logger.Level.LOG;

    // Redux Store
    this.ngRedux.configureStore(
      reducer,
      {
        rails: {direction: 'left'},
        chart: {votes: [13, 53]}
      },
      []
    );
  }
}
