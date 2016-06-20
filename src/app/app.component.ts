import {Component, ViewEncapsulation} from "@angular/core";
import {RouteConfig} from "@angular/router-deprecated";
import {RouterActive} from "./router-active/router-active.directive";
import {SandboxComponent} from "./sandbox/sandbox.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ChartSandboxComponent} from "./charts/charts.component";
import {AsyncPipe} from "@angular/common";
import {NgRedux} from "ng2-redux/lib/index";
import {RootState} from "./store/index";
import reducer from './reducers/index';

@Component({
  selector: 'app',
  template: `
    <span router-active>
      <button [routerLink]=" ['Dashboard'] ">
        Dashboard
      </button>
    </span>
    <span router-active>
      <button [routerLink]=" ['Sandbox'] ">
        Sandbox
      </button>
    </span>
    <span router-active>
      <button [routerLink]=" ['Charts'] ">
        Charts
      </button>
    </span>
    
    <router-outlet></router-outlet>
  `,
  providers: [],
  directives: [RouterActive],
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
  constructor(private ngRedux: NgRedux<RootState>) {

    // Do this once in the top-level app component.
    this.ngRedux.configureStore(
      reducer,
      { railsSwitch: 'left' },
      [ ]
    );

  }
}
