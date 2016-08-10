import {Component, ViewEncapsulation} from "@angular/core";
import {select} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Observable";
import {VotesCountState} from "../../store/index";
import {VoteCounterComponent} from "./vote-counter/vote-counter.component";
import {VotesActions} from "./votes.actions";
import {BarChartComponent} from "../../shared/bar-chart/bar-chart.component";
import {VoteThroughputComponent} from "./vote-throughput/vote-throughput.component";

@Component({
  selector: 'vote',
  directives: [VoteCounterComponent, VoteThroughputComponent, BarChartComponent],
  providers: [VotesActions],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div *ngIf="!showResults" class="voting">
      <vote-counter [data]="counter$ | async"></vote-counter>
      <vote-throughput [data]="history$ | async"></vote-throughput>
    </div>
    <h2 *ngIf="showResults">Results</h2>
    <bar-chart *ngIf="showResults" [data]="distribution$ | async"></bar-chart>
  `,
  styles: [`
    .highcharts-container {
      display: inline-block;
    }
  `]
})
export class VoteComponent {
  @select(['votes', 'counter']) counter$:Observable<VotesCountState>;
  @select(['votes', 'status']) status$:Observable<string>;
  @select(['votes', 'distribution']) distribution$:Observable<Array<number>>;
  @select(['votes', 'throughput', 'history']) history$:Observable<Array<VotesCountState>>;

  interval:any = undefined;
  showResults:boolean = false;

  constructor(private votesActions:VotesActions) {
    this.status$
      .subscribe(status => {
        this.showResults = status === 'VOTE_STATION_RESULT';

        switch (status) {
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
