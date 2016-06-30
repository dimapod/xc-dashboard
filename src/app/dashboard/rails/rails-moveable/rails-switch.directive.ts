import {Directive, Input, ElementRef, Renderer} from "@angular/core";

@Directive({
  selector: '[rails-switch]'
})
export class RailsSwitch {
  @Input('rails-switch') switchCurrentPosition:string = undefined;
  @Input('switch-direction') switchDirection:string = undefined;

  constructor(private element:ElementRef, private renderer:Renderer) {}

  ngOnChanges() {
    if (this.switchCurrentPosition===this.switchDirection) {
      this.display();
    } else {
      this.hide();
    }
  }

  display() {
    this.renderer.setElementAttribute(this.element.nativeElement, 'display', 'block');
  }

  hide() {
    this.renderer.setElementAttribute(this.element.nativeElement, 'display', 'none');
  }
}


