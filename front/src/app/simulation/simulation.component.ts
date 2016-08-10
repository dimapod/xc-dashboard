import {Component, OnInit} from "@angular/core";
import {Logger} from "angular2-logger/core";
import {SimulationItemComponent} from "./simulation-item.component";
import {ConfigurationService} from "./configuration.service";
import {SimulationMessage} from "./simulation.model";
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'simulation',
  providers: [Logger, ConfigurationService],
  directives: [SimulationItemComponent],
  styles: [`
    .title-simulation {
      margin-left: 10px;
    }
  
    .form-container {
      display: inline-block;
      margin-left: 10px;
      width: 300px;
    }
  `],
  template: `
    <h1 class="title-simulation">Simulation</h1>
    <div *ngFor="let simulation of simulationMessages|async" class="form-container">
      <simulation-item [simulation]="simulation"></simulation-item>
    </div>
`
})
export class SimulationComponent implements OnInit {

  simulationMessages:Observable<Array<SimulationMessage>>;

  constructor(private configurationService:ConfigurationService) {
  }

  ngOnInit() {
    this.simulationMessages = this.configurationService.loadConfiguration();
  }
}
