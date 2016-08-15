import {Component} from "@angular/core";
import {select} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Observable";
import {ObstacleState} from "../../store/index";
import {ObstacleActions} from "./obstacle.actions";

@Component({
  selector: 'obstacle',
  template: `  <div class="obstacle-popup" *ngIf="isDisplayed">
    <h2>Attention! {{obstacleLabel}} se trouve sur la voie.</h2>
    <div class="animal-icon" [ngClass]="getAnimalIconClass()"></div>
    <button (click)="obstacleActions.dismissWarning()" class="continue-button">Continuer</button>
  </div>`,
  providers: [ObstacleActions],
  directives: [],
  pipes: [],
  styles: [require('./obstacle.component.scss')]
})
export class ObstacleComponent {
  name = 'obstacle display';
  obstacleType: string;
  obstacleLabel: string;
  isDisplayed: boolean;
  obstacleLabelMap: Object = {
    COW: 'Une vache',
    PONEY: 'Un poney',
    UNICORN: 'Une licorne',
    UNKNOWN_OBSTACLE: 'Quelque chose'
  };

  @select('obstacle') obstacle$: Observable<ObstacleState>;

  constructor(private obstacleActions: ObstacleActions) {
    this.isDisplayed = false;
  }

  ngOnInit() {
    this.obstacle$.subscribe((data: ObstacleState) => {
      this.obstacleType = (this.obstacleLabelMap[data.obstacleType]) ? data.obstacleType : 'UNKNOWN_OBSTACLE';
      this.obstacleLabel = this.obstacleLabelMap[this.obstacleType];

      this.isDisplayed = data.isDisplayed;
    });
  }

  getAnimalIconClass() {
    return 'my-' + this.obstacleType.toLowerCase();
  }
}
