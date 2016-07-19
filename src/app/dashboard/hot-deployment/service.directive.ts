import {Directive, Input, Renderer, ElementRef} from "@angular/core";

@Directive({
  selector: 'rect'
})
export class ServiceDirective {

  @Input()
  public id:string;

  public interval:any;

  private tick:boolean;


  constructor(public elementRef:ElementRef, public renderer:Renderer) {
  }

  deployVersion() {
    this.renderer.setElementAttribute(this.elementRef.nativeElement, 'fill', this.tick ? '#ffffff' : '#000000');
    this.tick = !this.tick;
  }

  switchColor(color:string) {
    this.renderer.setElementAttribute(this.elementRef.nativeElement, 'fill', color);
  }
}
