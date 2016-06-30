
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class ConfigurationService {

  private configFile:string = 'messages.json';

  constructor(private http:Http) {
  }

  loadConfiguration():Observable<any>{
    return this.http.get(this.configFile).map(res => res.json());
  }
}
