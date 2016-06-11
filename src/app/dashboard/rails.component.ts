import {Component, ViewEncapsulation, QueryList, ViewChildren} from "@angular/core";
import {Step} from "./step.directive";
import {SocketService} from "../service/socket.service.ts";
import {Train} from "../models/train";

@Component({
  selector: 'rails',
  template: require('./rails.component.html'),
  providers: [SocketService],
  directives: [Step],
  pipes: [],
  encapsulation: ViewEncapsulation.None,
  styles: [``]
})
export class RailsComponent {

  @ViewChildren(Step) steps:QueryList<Step>;

  switchLeft:string = 'none';
  switchRight:string = 'block';
  trains:Array<Train> = new Array();
  data:string;

  constructor(public socketService:SocketService) {
    this.trains.push(new Train('01', 'pos_1_step_1', 'url(#mx-gradient-ffcd28-1-ffa500-1-s-0)'));
    this.trains.push(new Train('02', 'pos_2_step_1', 'url(#mx-gradient-e1d5e7-1-8c6c9c-1-s-0)'));
  }

  switch() {
    if (this.switchLeft === 'none') {
      this.switchLeft = 'block';
      this.switchRight = 'none';
    } else {
      this.switchLeft = 'none';
      this.switchRight = 'block';
    }

    console.log(this.switchLeft, this.switchRight);
  }

  ngAfterViewInit() {
    this.trains.forEach(train => {
      console.log(`train: {id :${train.id}  position: ${train.position}`);
      this.findStep(train.position).display();
    });
    this.socketService.onRabbitMessage((data:any)=> {
      this.onReceiveMessage(data)
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


