import {Component, ViewEncapsulation, QueryList, ViewChildren} from "@angular/core";
import {RailsActions} from "./rails.actions";
import {select} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Rx";
import {RailsState} from "../../store/index";
import {Train} from "./train.models";
import {RailsSwitch} from "./rails-moveable/rails-switch.directive";

@Component({
  selector: 'rails',
  template: require('./rails.component.html'),
  providers: [RailsActions],
  directives: [RailsSwitch],
  pipes: [],
  encapsulation: ViewEncapsulation.None,
  styles: [``]
})
export class RailsComponent {


  trains:Array<Train> = [];
  data:string;

  @select('rails') rails$: Observable<RailsState>;

  railSwitchState$:Observable<any> = this.rails$
    .map((railsState:RailsState) => railsState.direction);


  constructor(public railsActions:RailsActions) {}

  ngOnInit() {
    this.rails$
      .map((railsState:RailsState) => railsState.trains)
      .subscribe((trains:Array<any>) => {
          this.trains = trains.map((train) => new Train(train.id, train.position, train.color));
      });
  }


  isTrainDisplayedAt(positionRef:string){
    return !!this.trains.filter((train) => train.position=== positionRef)[0];
  }

  getTrainColorAt(positionRef:string){
     var foundTrain = this.trains.filter((train) => train.position=== positionRef)[0];
    return (foundTrain)?foundTrain.color:'';
  }
}


