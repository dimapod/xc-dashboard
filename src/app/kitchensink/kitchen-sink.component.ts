import {Component, OnInit} from '@angular/core';
import {WelcomeComponent} from "../dashboard/welcome/welcome.component";
import {VotesCountState} from "../store/index";
import {VoteCounterComponent} from "../dashboard/votes/vote-counter/vote-counter.component";
import {VoteThroughputComponent} from "../dashboard/votes/vote-throughput/vote-throughput.component";
import {BarChartComponent} from "../shared/bar-chart/bar-chart.component";
import {KubernetesNode, KubernetesNodeComponent, KubernetesComponent} from "../dashboard/high-availability";
import {VideoDisplayComponent} from "../dashboard/video-display/video-display.component";

@Component({
  moduleId: module.id,
  selector: 'kitchen-sink',
  directives: [WelcomeComponent, VoteCounterComponent, VoteThroughputComponent, BarChartComponent, KubernetesComponent, KubernetesNodeComponent, VideoDisplayComponent],
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

  // kubernetes
  kubernetesData:Array<KubernetesNode> = [
    {
      name: "node-A",
      state: "ON",
      apps: [{name: "app-name-1"}, {name: "app-name-2"}, {name: "app-name-3"}],
      labels: [{name: 'label-1'}, {name: 'label-2'}]
    },
    {
      name: "node-B",
      state: "OFF",
      apps: [{name: "app-name-10"}],
      labels: [{name: 'label-10'}, {name: 'label-20'}]
    },
    {
      name: "node-C",
      state: "ON",
      apps: [{name: "app-name-100"}, {name: "app-name-200"}, {name: "app-name-300"}],
      labels: [{name: 'label-100'}, {name: 'label-200'}]
    }
  ];

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
