import {Injectable} from "@angular/core";
import {NgRedux} from "ng2-redux/lib/index";
import {RootState} from "../../../store/index";

@Injectable()
export class TrainActions {
  constructor(private ngRedux:NgRedux<RootState>) {
  }

  static TRAIN_POSITION:string = 'TRAIN_POSITION';

}
