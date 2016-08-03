import {Directive, Input, Renderer, ElementRef} from "@angular/core";
import {HotDeploymentService} from "./hot-deployment.service";

@Directive({
  selector: 'ellipse',
  providers:[HotDeploymentService]
})
export class LampDirective {

  @Input()
  public id:string;

  constructor(public elementRef:ElementRef, public renderer:Renderer, public hotDeploymentService:HotDeploymentService) {
  }

  changeColor(color:number){
    // this.renderer.setElementAttribute(this.elementRef.nativeElement, 'fill', this.hotDeploymentService.RGBToHex(color, 255, 255));
    this.renderer.setElementAttribute(this.elementRef.nativeElement, 'fill', 'rgba(255, 0, 0,'+color+')');
  }
}
