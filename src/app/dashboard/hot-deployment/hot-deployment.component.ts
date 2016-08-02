import {Component, ViewChildren, QueryList, AfterViewInit} from "@angular/core";
import {LampDirective} from "./lamp.directive";
import {Logger} from "angular2-logger/core";
import {select, NgRedux} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Rx";
import {LampState, RootState, ServiceState} from "../../store/index";
import {HotDeploymentService} from "./hot-deployment.service";
import {ServiceDirective} from "./service.directive";

@Component({
  selector: 'hot-deployment',
  template: require('./hot-deployment.html'),
  directives: [LampDirective, ServiceDirective],
  providers: [Logger, HotDeploymentService],
  styles: [``]
})
export class HotDeploymentComponent implements AfterViewInit {

  private versionV1:string = '#ffe6cc';
  private versionV2:string = '#9ac7bf';

  @ViewChildren(LampDirective)
  private lamps:QueryList<LampDirective>;

  @ViewChildren(ServiceDirective)
  private services:QueryList<ServiceDirective>;

  @select(state => state.hotDeployment.lamps)
  lamps$:Observable<Array<LampState>>;

  @select(state => state.hotDeployment.services)
  services$:Observable<Array<ServiceState>>;

  constructor(private ngRedux:NgRedux<RootState>, public hotDeploymentService:HotDeploymentService) {
  }


  ngAfterViewInit() {
    this.lamps$.subscribe(lamps => {
      lamps.forEach(lamp => {
        const lampDirective = this.findLamp(lamp.id);
        if (lampDirective) {
          lampDirective.changeColor(this.hotDeploymentService.RGBToHex(lamp.color, 0, 0));
        }
      });
    });

    this.services$.subscribe(services => {
      services.forEach(service => {
        const serviceDirective = this.findService(service.id);
        if (serviceDirective) {
          if (service.status === 'START' && serviceDirective.interval === undefined) {
            serviceDirective.interval = setInterval(() => serviceDirective.deployVersion(), 500);
          }
          else if (service.status === 'STOP' && serviceDirective.interval) {
            clearInterval(serviceDirective.interval);
            serviceDirective.interval = undefined;
            serviceDirective.switchColor(service.version === 'V1' ? this.versionV1 : this.versionV2)
          }
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
