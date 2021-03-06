import {Directive, Input, ElementRef, Renderer} from "@angular/core";
import {SwitchState} from "../../../store/index"

@Directive({
  selector: '[rails-switch]'
})
export class RailsSwitch {
  @Input('rails-switch') switchId: number = undefined;
  @Input('rails-switch-command') switchesCurrentPositions: Array<SwitchState> = undefined;
  @Input('switch-direction') switchDirection: string = undefined;

  constructor(private element: ElementRef, private renderer: Renderer) {
  }

  ngOnChanges() {
    var matchingSwitchPosition = this.switchesCurrentPositions.filter((switchPosition)=> switchPosition.switchId === this.switchId)[0];
    if (!!matchingSwitchPosition) {
      if (matchingSwitchPosition.direction === this.switchDirection) {
        this.display();
      } else {
        this.hide();
      }
    }
  }

  display() {
    this.renderer.setElementAttribute(this.element.nativeElement, 'display', 'block');
  }

  hide() {
    this.renderer.setElementAttribute(this.element.nativeElement, 'display', 'none');
  }
}


