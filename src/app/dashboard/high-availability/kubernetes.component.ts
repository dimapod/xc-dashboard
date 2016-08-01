import {Component, OnInit, Input} from '@angular/core';
import {KubernetesNode} from "./kubernetes.model";
import {KubernetesNodeComponent} from "./kubernetes-node.component";

@Component({
  moduleId: module.id,
  selector: 'kubernetes',
  directives: [KubernetesNodeComponent],
  template: `
      <kubernetes-node *ngFor="let node of data" [data]="node"></kubernetes-node>
      <h2 *ngIf="!data.length">No data</h2>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    h2 {
      color: brown;
    }
  `]
})
export class KubernetesComponent implements OnInit {

  @Input() data:Array<KubernetesNode>;

  constructor() {
  }

  ngOnInit() {
  }

}
