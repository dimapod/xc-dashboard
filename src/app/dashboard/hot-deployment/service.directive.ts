import {Directive, Input, Renderer, ElementRef, ViewChild, ContentChild, AfterContentInit} from "@angular/core";

@Directive({
  selector: 'g'
})
export class ServiceDirective implements AfterContentInit {

  private versionV1:string = '#ffe6cc';
  private versionV2:string = '#9ac7bf';

  @Input()
  public id:string;

  @ContentChild('service')
  private service:ElementRef;

  @ContentChild('version')
  private version:ElementRef;

  private interval:any;

  // private version:string = 'V1';

  private tick:boolean;

  constructor(public renderer:Renderer) {
  }

  ngAfterContentInit() {
    if (this.service) {
      const x:number = this.service.nativeElement.attributes.x.value;
      const y:number = this.service.nativeElement.attributes.y.value;
      const height:number = this.service.nativeElement.attributes.height.value;
      this.renderer.setElementAttribute(this.version.nativeElement, 'x', (+x + (height / 2)).toString());
      this.renderer.setElementAttribute(this.version.nativeElement, 'y', (+y + (height / 2) + 5).toString());
    }
  }

  deployVersion() {
    this.renderer.setElementAttribute(this.service.nativeElement, 'fill', this.tick ? '#ffffff' : '#ee0300');
    this.tick = !this.tick;
  }

  switchColor(color:string) {
    this.renderer.setElementAttribute(this.service.nativeElement, 'fill', color);
  }

  handleStatus(status:string, version:string) {
    // this.version = version;
    this.renderer.setText(this.version.nativeElement, version);
    if (status === 'START' && this.interval === undefined) {
      this.interval = setInterval(() => this.deployVersion(), 500);
    }
    else if (status === 'STOP' && this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
    this.switchColor(version === 'V1' ? this.versionV1 : this.versionV2);
  }
}
