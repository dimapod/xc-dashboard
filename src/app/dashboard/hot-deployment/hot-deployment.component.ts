import {Component, ViewChildren, QueryList, AfterViewInit} from "@angular/core";
import {LampDirective} from "./lamp.directive";
import {Logger} from "angular2-logger/core";
import {select, NgRedux} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Rx";
import {LampState, RootState, ServiceState} from "../../store/index";
import {ServiceDirective} from "./service.directive";

@Component({
  selector: 'hot-deployment',
  template: require('./hot-deployment.html'),
  directives: [LampDirective, ServiceDirective],
  providers: [Logger],
  styles: [`
    :host {
      text-align: center;
      display: block;
      margin-top: 10px;
    }
  `]
})
export class HotDeploymentComponent implements AfterViewInit {

  @ViewChildren(LampDirective)
  private lamps:QueryList<LampDirective>;

  @ViewChildren(ServiceDirective)
  private services:QueryList<ServiceDirective>;

  @select(state => state.hotDeployment.lamps)
  lamps$:Observable<Array<LampState>>;

  @select(state => state.hotDeployment.services)
  services$:Observable<Array<ServiceState>>;

  constructor(private ngRedux:NgRedux<RootState>) {
  }


  ngAfterViewInit() {
    this.lamps$.subscribe(lamps => {
      lamps.forEach(lamp => {
        const lampDirective = this.findLamp(lamp.id);
        if (lampDirective) {
          lampDirective.changeColor(lamp.color);
        }
      });
    });

    this.services$.subscribe(services => {
      services.forEach(service => {
        const serviceDirective = this.findService(service.id);
        if (serviceDirective) {
          serviceDirective.handleStatus(service.status, service.version);
        }
      });
    });

  }

  private findLamp(id:string):LampDirective {
    return this.lamps.toArray().find(lamp => {
      if (lamp.id === id) {
        return lamp;
      }
    });
  }

  private findService(id:string):ServiceDirective {
    return this.services.toArray().find(service => {
      if (service.id === id) {
        return service;
      }
    });
  }

}
