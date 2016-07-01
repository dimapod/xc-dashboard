import {Component} from "@angular/core";
import {select} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Observable";
import {VotesCountState} from "../../store/index";
import {VoteCounterComponent} from "./vote-counter/vote-counter.component";
import {VotesActions} from "./votes.actions";
import {BarChartComponent} from "../../shared/bar-chart/bar-chart.component";

@Component({
  selector: 'vote',
  directives: [VoteCounterComponent, BarChartComponent],
  providers: [VotesActions],
  template: `
    <vote-counter *ngIf="!showResults" [data]="counter$ | async"></vote-counter>
    <h2 *ngIf="showResults">Results</h2>
    <bar-chart *ngIf="showResults" [data]="distribution$ | async"></bar-chart>
  `,
  styles: [``]
})
export class VoteComponent {
  @select(['votes', 'counter']) counter$:Observable<VotesCountState>;
  @select(['votes', 'status']) status$:Observable<string>;
  @select(['votes', 'distribution']) distribution$:Observable<Array<number>>;

  interval:any = undefined;
  showResults:boolean = false;

  constructor(private votesActions:VotesActions) {
    this.status$
      .subscribe(status => {
        this.showResults = status === 'VOTE_STATION_RESULT';

        switch(status) {
          case 'VOTE_STATION' :
            if (!this.interval) {
              this.interval = setInterval(() => votesActions.voteTick(), 5000);
            }
            break;
          default :
            this.interval && clearInterval(this.interval);
            this.interval = undefined;
            break;
        }
      });
  }
}
