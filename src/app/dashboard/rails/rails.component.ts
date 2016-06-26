import {Component, ViewEncapsulation, QueryList, ViewChildren} from "@angular/core";
import {Step} from "./step.directive";
import {RailsActions} from "./rails.actions";
import {select} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Rx";
import {RailsState} from "../../store/index";
import {Train} from "./rails.models";

@Component({
  selector: 'rails',
  template: require('./rails.component.html'),
  providers: [RailsActions],
  directives: [Step],
  pipes: [],
  encapsulation: ViewEncapsulation.None,
  styles: [``]
})
export class RailsComponent {

  @ViewChildren(Step) steps:QueryList<Step>;

  switchLeft:string = 'none';
  switchRight:string = 'block';
  trains:Array<Train> = [];
  data:string;

  @select('rails') rails$: Observable<RailsState>;

  constructor(public railsActions:RailsActions) {
    this.trains.push(new Train('01', 'pos_1_step_1', 'url(#mx-gradient-ffcd28-1-ffa500-1-s-0)'));
    this.trains.push(new Train('02', 'pos_2_step_1', 'url(#mx-gradient-e1d5e7-1-8c6c9c-1-s-0)'));
  }

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
  }

  ngAfterViewInit() {
    this.trains.forEach(train => {
      console.log(`train: {id :${train.id}  position: ${train.position}`);
      this.findStep(train.position).display();
    });
  }

  onReceiveMessage(data:any) {
    let train:Train;
    console.log('socket: ' + JSON.stringify(data));
    console.log('content: ' + data.content);
    let content = JSON.parse(data.content);

    if (content.train) {
      train = this.findTrain(content.train);
      this.moveTrain(train, content.step);
    }
  }

  findStep(id:string):Step {
    return this.steps.filter((x) => {
      return x.getId() === id;
    })[0];
  }

  findTrain(id:string):Train {
    return this.trains.filter((train) => {
      return train.id === id;
    })[0];
  }

  moveTrain(train:Train, step:string) {
    this.findStep(train.position).hide();
    train.position = step;
    this.findStep(train.position).display();
  }

  emulate() {
    console.log(this.data);
    this.onReceiveMessage(JSON.parse(this.data));
  }
}

