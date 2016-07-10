import {Component, OnInit, Input} from '@angular/core';
import {KubernetesNode} from "./kubernetes.model";

@Component({
  moduleId: module.id,
  selector: 'kubernetes-node',
  templateUrl: 'kubernetes-node.component.html'
})
export class KubernetesNodeComponent implements OnInit {

  @Input() data:KubernetesNode;

  constructor() {
  }

  ngOnInit() {
  }

}
