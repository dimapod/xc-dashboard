import {Component} from "@angular/core";

@Component({
  selector: 'welcome',
  template: `
    <h1>Welcome to <span>XebiCon</span></h1>
  `,
  directives: [],
  styles: [`
    h1 {
      font-size: 4em;
    }
    span {
      color: blueviolet;
    }
  `]
})
export class WelcomeComponent {
}
