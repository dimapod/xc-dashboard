import {Component, ElementRef, Renderer} from "@angular/core";
import {select} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Observable";
import {ObstacleWarningState} from "../../store/index";
import {ObstacleActions} from "./obstacle.actions";

@Component({
  selector: 'obstacle-display',
  template: `
    <h2>Attention! {{obstacleLabel}} se trouve sur la voie.</h2>
    <div class="animal-icon" [ngClass]="getAnimalIconClass()"></div>
    <button (click)="obstacleActions.dismissWarning()" class="continue-button">Continuer</button>
  `,
  providers: [ObstacleActions],
  directives: [],
  pipes: [],
  styles:  [require('./obstacle.component.css')]
})
export class ObstacleDisplayComponent {
  name = 'obstacle display';
  obstacleType:string;
  obstacleLabel:string;
  obstacleLabelMap:Object = {
    cow:'Une vache',
    poney:'Un poney',
    unicorn:'Une licorne'
  };

  @select('obstacleWarning') obstacleWarning$:Observable<ObstacleWarningState>;

  constructor( private obstacleActions:ObstacleActions, private element:ElementRef, private renderer:Renderer) {
    this.hide();
  }

  ngOnInit() {
    this.obstacleWarning$.subscribe((data:ObstacleWarningState) => {
      this.obstacleType  = data.obstacleType;
      this.obstacleLabel = this.obstacleLabelMap[data.obstacleType];
      (data.isDisplayed)?this.display():this.hide();
    });
  }

  hide() {
    this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
  }

  display() {
    this.renderer.setElementStyle(this.element.nativeElement, 'display', 'block');
  }

  getAnimalIconClass(){
    return 'my-'+this.obstacleType;
  }
}
