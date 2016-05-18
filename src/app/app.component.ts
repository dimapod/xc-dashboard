import {Component, ViewEncapsulation} from "@angular/core";
import {Home} from "./home/home.component";

@Component({
  selector: 'app',
  pipes: [],
  template: `
    <div>{{ name }}</div>
    <home></home>
  `,
  providers: [],
  directives: [ Home ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    `
    html, body {
      height: 100%;
    }
    `
  ]
})
export class App {
  name = 'Angular 2 Webpack Starter';

  constructor() { }

  ngOnInit() {
  }
}
