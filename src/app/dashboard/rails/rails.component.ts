import {Component, ViewEncapsulation, QueryList, ViewChildren} from "@angular/core";
import {RailsActions} from "./rails.actions";
import {select} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Rx";
import {RailsState} from "../../store/index";
import {Train} from "./train.models";

@Component({
  selector: 'rails',
  template: require('./rails.component.html'),
  providers: [RailsActions],
  directives: [],
  pipes: [],
  encapsulation: ViewEncapsulation.None,
  styles: [``]
})
export class RailsComponent {


  switchLeft:string = 'none';
  switchRight:string = 'block';
  trains:Array<Train> = [];
  data:string;

  @select('rails') rails$: Observable<RailsState>;

  constructor(public railsActions:RailsActions) {}

  ngOnInit() {
    this.rails$
      .map((railsState:RailsState) => railsState.direction)
      .subscribe((data:string) => {
        if (data === 'left') {
          this.switchLeft = 'block';
          this.switchRight = 'none';
        } else {
          this.switchLeft = 'none';
          this.switchRight = 'block';
        }
      });

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


