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
  styles: [
    `
    :host {
      position:fixed;
      top:25%;
      left:25%;
      width:50%;
      text-align:center;
      padding:1em;
      border: 1px solid black;
      background-color:#FFFFFF;
      border-radius:0.5em;
    }

    .animal-icon {
      height:100px;
      margin-bottom: 0.5em;
    }
    .my-cow {
      background: url(assets/img/warning-cow.svg) no-repeat center;
      background-size: contain;
    }
    .my-poney {
      background: url(assets/img/warning-horse.svg) no-repeat center;
      background-size: contain;
    }
    .my-unicorn {
      background: url(assets/img/warning-unicorn.svg) no-repeat center;
      background-size: contain;
    }
    `
  ]
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
