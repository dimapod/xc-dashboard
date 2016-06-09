import {Component, ViewEncapsulation} from "@angular/core";
import {RouteConfig} from "@angular/router-deprecated";
import {RouterActive} from "./router-active/router-active.directive";
import {SandboxComponent} from "./sandbox/sandbox.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ChartSandboxComponent} from "./charts/charts.component";

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
@RouteConfig([
  {path: '/', name: 'Dashboard', component: DashboardComponent, useAsDefault: true},
  {path: '/sandbox', name: 'Sandbox', component: SandboxComponent},
  {path: '/charts', name: 'Charts', component: ChartSandboxComponent}
])
export class App {

}
