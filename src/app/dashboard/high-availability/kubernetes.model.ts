export class KubernetesNode {
  name:string;
  state:string;
  apps:Array<KubernetesApp>;
  labels:Array<KubernetesLabel>;
}

export class KubernetesApp {
  name:string
}

export class KubernetesLabel {
  name:string
}

