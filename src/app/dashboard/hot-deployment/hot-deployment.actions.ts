import {Injectable} from "@angular/core";
import {NgRedux} from "ng2-redux/lib/index";
import {RootState} from "../../store/index";

@Injectable()
export class HotDeploymentActions {
  constructor(private ngRedux:NgRedux<RootState>) {
  }

  static LIGHT_STATE:string = 'LIGHT_STATE';
  static SERVICE_DEPLOYMENT_START:string = 'SERVICE_DEPLOYMENT_START';
  static SERVICE_DEPLOYMENT_END:string = 'SERVICE_DEPLOYMENT_END';

  // dismissWarning():void {
  //   this.ngRedux.dispatch({type: HotDeploymentActions.WARNING_DISMISS});
  // }
}
