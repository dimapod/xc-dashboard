import {Component} from "@angular/core";

@Component({
  selector: 'welcome',
  template: `
    <h1>Welcome to <span>XebiCon</span></h1>
  `,
  directives: [],
  styles: [`
    h2 {
      color: blue;
    }
    span {
      color: blueviolet;
    }
    :host {
      text-align: center;
      margin-top: 100px;
      display: block;
    }
  `]
})
export class WelcomeComponent {
}
