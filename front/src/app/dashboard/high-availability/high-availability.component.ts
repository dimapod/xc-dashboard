import {Component, OnInit} from '@angular/core';
import {KubernetesComponent} from "./kubernetes.component";
import {select} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Rx";
import {KubernetesNode} from "./kubernetes.model";

@Component({
  moduleId: module.id,
  selector: 'high-availability',
  directives: [KubernetesComponent],
  template: `
      <kubernetes [data]="highAvailability$ | async"></kubernetes>
  `,
  styles: [`
  `]
})
export class HighAvailabilityComponent implements OnInit {

  @select(['highAvailability', 'nodes']) highAvailability$:Observable<Array<KubernetesNode>>;

  constructor() {
  }

  ngOnInit() {
  }

}
