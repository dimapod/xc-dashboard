import {Component, OnInit} from "@angular/core";
import {Logger} from "angular2-logger/core";
import {SimulationItemComponent} from "./simulation-item.component";
import {ConfigurationService} from "./configuration.service";
;
@Component({
  selector: 'simulation',
  providers: [Logger, ConfigurationService],
  directives: [SimulationItemComponent],
  styles: [`
  .title-simulation{
    margin-left:5%;
  }

  .form-container{
    display: inline-block;
    margin-left:5%;
    width:40%;
    min-width:30em;
  }
`],
  template: `
    <h1 class="title-simulation">Simulation</h1>
    <div *ngFor="let type of simulations" class="form-container">
      <simulation-item [message]="type"></simulation-item>
    </div>
`
})
export class SimulationComponent implements OnInit {

  simulations:Array<MessageType> = [];

  constructor(private configurationService:ConfigurationService, private logger:Logger) {
  }

  ngOnInit() {
    this.configurationService.loadConfiguration().subscribe(data => {
        data.forEach(item => {
          item.payload = JSON.stringify(item.payload);
          console.log(item);
          this.simulations.push(item);
        });
      },
      (err)=>console.log(err),
      ()=>console.log('done'));
  }
}

export class MessageType {

  public type:string;
  public payload:string;

  constructor(type:string, payload:string) {
    this.type = type;
    this.payload = payload;
  }

}
