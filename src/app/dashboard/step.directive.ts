import {Directive, ElementRef, Renderer, Input} from "@angular/core";

@Directive({
  selector: 'rect'
  // inputs: ['_id']
})
export class Step {
  @Input('id') private id:string;

  constructor(private element:ElementRef, private renderer:Renderer) {
    this.hide();
  }

  ngOnInit() {
    console.log(this.id);
  }

  getId():string {
    return this.id;
  }

  display() {
    this.renderer.setElementAttribute(this.element.nativeElement, 'display', 'block');
  }

  hide() {
    this.renderer.setElementAttribute(this.element.nativeElement, 'display', 'none');

  }
}
