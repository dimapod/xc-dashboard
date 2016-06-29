import {Component} from "@angular/core";
import {select} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Observable";
import {VotesState} from "../../store/index";
import {VoteCounterComponent} from "./vote-counter/vote-counter.component";

@Component({
  selector: 'vote',
  directives: [VoteCounterComponent],
  providers: [],
  template: `
    <vote-counter [data]="counter$ | async"></vote-counter>
  `,
  styles: [``]
})
export class VoteComponent {
  @select('votes') votes$:Observable<VotesState>;
  counter$:Observable<any> = this.votes$
    .map((state:VotesState) => state.counter);
}
