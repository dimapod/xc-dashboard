import {Component, ViewEncapsulation} from "@angular/core";

@Component({
  selector: 'rails',
  template: require('./rails.component.html'),
  providers: [],
  directives: [],
  pipes: [],
  encapsulation: ViewEncapsulation.None,
  styles: [``]
})
export class RailsComponent {

  switchLeft:string = 'none';
  switchRight:string = 'block';

  switch() {
    if (this.switchLeft === 'none') {
      this.switchLeft = 'block';
      this.switchRight = 'none';
    } else {
      this.switchLeft = 'none';
      this.switchRight = 'block';
    }

    console.log(this.switchLeft, this.switchRight);
  }
}
