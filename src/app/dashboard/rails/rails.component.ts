import {Component, QueryList, ViewChildren} from "@angular/core";
import {RailsActions} from "./rails.actions";
import {select} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Rx";
import {RailsState} from "../../store/index";
import {Train} from "./train.models";
import {RailsSwitch} from "./rails-moveable/rails-switch.directive";
import {TrainDisplay} from "./rails-moveable/train-display.directive";

@Component({
  selector: 'rails',
  template: require('./rails.component.html'),
  providers: [RailsActions],
  directives: [RailsSwitch, TrainDisplay],
  pipes: [],
  styles: [`
    :host {
      text-align: center;
      display: block;
      border-bottom: 2px solid grey;
    }
  `]
})
export class RailsComponent {


  trains:Array<Train> = [];
  data:string;

  @select('rails') rails$: Observable<RailsState>;

  railSwitchState$:Observable<any> = this.rails$
    .map((railsState:RailsState) => railsState.switchDirections);


  trainsState$:Observable<any> = this.rails$
    .map((railsState:RailsState) => railsState.trains);


  constructor() {}
}


