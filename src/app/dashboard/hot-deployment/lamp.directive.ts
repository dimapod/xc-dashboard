import {Directive, Input, Renderer, ElementRef} from "@angular/core";
/**
 * Created by ludovicladeu on 16/07/16.
 */

@Directive({
  selector: 'ellipse'
})
export class LampDirective {

  @Input()
  public id:string;
  // @Input()
  // private color:string;

  constructor(public elementRef:ElementRef, public renderer:Renderer) {
  }

  changeColor(color:string){
    this.renderer.setElementAttribute(this.elementRef.nativeElement, 'fill', color);
  }
}
