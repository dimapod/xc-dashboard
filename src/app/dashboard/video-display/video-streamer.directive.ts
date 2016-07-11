import {Directive, Input, ElementRef, Renderer} from "@angular/core";


@Directive({
  selector: '[video-streamer]',
  providers: []
})
export class VideoStreamer {

  constructor(private element:ElementRef, private renderer:Renderer) {
  }



  ngOnInit() {
    this.element.nativeElement.load();
    this.element.nativeElement.play();
  }



}


