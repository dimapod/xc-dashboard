import {Component, ViewChild, ViewChildren, QueryList} from "@angular/core";
import {Child} from "../child/child.component";

@Component({
  selector: 'home',
  providers: [],
  directives: [ Child ],
  pipes: [ ],
  styles: [ require('./home.css') ],
  template: `
    <child #child1></child>
    <child #child2></child>
    <button (click)="onClick()">Invoke greet on child 1</button>
    <button (click)="child2.greet('from inside the html')">Invoke greet on child 2</button>
  `
  //template: require('./home.html')
})
export class Home {

  // Reference to child elements
  @ViewChild('child1') firstChild: Child;
  @ViewChild(Child) firstChildRef: Child;
  @ViewChildren(Child) children: QueryList<Child>;

  ngAfterViewInit() {
    console.log('firstChild', this.firstChild);
    console.log('firstChildRef', this.firstChildRef);
    console.log('children', this.children);
  }

  onClick() {
    this.firstChild.greet('Home component');
  }
}
