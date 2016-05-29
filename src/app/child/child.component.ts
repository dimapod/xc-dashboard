import {Component} from "@angular/core";

@Component({
  selector: 'child',
  providers: [],
  directives: [],
  pipes: [ ],
  template: `
    <h3>Child</h3>
  `
})
export class Child {
  greet(name) {
    console.log('Hello from ' + name);
  }
}
