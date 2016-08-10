import {Injectable} from "@angular/core";
import {NgRedux} from "ng2-redux/lib/index";
import {RootState} from "../../store/index";

@Injectable()
export class HighAvailabilityActions {
  static K8S_STATUS:string = 'K8S_STATUS';

  constructor(private ngRedux:NgRedux<RootState>) {
  }

  k8sStatus(payload):void {
    this.ngRedux.dispatch({type: HighAvailabilityActions.K8S_STATUS, payload});
  }

}
