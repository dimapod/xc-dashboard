import {Component, OnInit} from '@angular/core';
import {WelcomeComponent} from "../dashboard/welcome/welcome.component";
import {VotesCountState} from "../store/index";
import {VoteCounterComponent} from "../dashboard/votes/vote-counter/vote-counter.component";
import {VoteThroughputComponent} from "../dashboard/votes/vote-throughput/vote-throughput.component";
import {BarChartComponent} from "../shared/bar-chart/bar-chart.component";
import {KubernetesNode, KubernetesNodeComponent} from "../dashboard/high-availability";

@Component({
  moduleId: module.id,
  selector: 'kitchen-sink',
  directives: [WelcomeComponent, VoteCounterComponent, VoteThroughputComponent, BarChartComponent, KubernetesNodeComponent],
  template: require('./kitchen-sink.component.html'),
  styles: [`
    h1.ks-label {
      text-align: center;
    }
    .ks-cmt {
      border-bottom: 3px solid burlywood;
    }
    
    label {
      display: block;
      padding: 10px;
      text-align: center;
      margin: 5px;
      border: 1px solid grey;
      background: aliceblue;
    }
  `]
})
export class KitchenSinkComponent implements OnInit {
  constructor() {
  }

  // kubernetes-node
  kubernetesNodeData:KubernetesNode = {
    name: "node-A",
    state: "ON",
    apps: [
      {name: "app-name-1"},
      {name: "app-name-2"}
    ],
    labels: [{name: 'label-1'}]
  };

  // bar-chart
  barChartData:Array<number> = [51, 66];

  // vote-throughput
  voteThroughputData:Array<VotesCountState> = [
    {mobile: 8, sms: 6, twitter: 10},
    {mobile: 10, sms: 3, twitter: 12},
    {mobile: 13, sms: 8, twitter: 19},
    {mobile: 18, sms: 14, twitter: 33},
    {mobile: 21, sms: 18, twitter: 28},
    {mobile: 26, sms: 16, twitter: 26},
    {mobile: 20, sms: 10, twitter: 25},
    {mobile: 18, sms: 9, twitter: 20},
    {mobile: 17, sms: 16, twitter: 24},
    {mobile: 8, sms: 2, twitter: 10},
    {mobile: 10, sms: 1, twitter: 11}
  ];

  // vote-counter
  voteCounterData:VotesCountState = {mobile: 21, sms: 28, twitter: 41};

  ngOnInit() {
  }
}
