import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";

//import {Observable} from 'rxjs/Rx';
//import {USERS} from './mock-users';


export class User {
  name:string;
  age:number;
}


@Injectable()
export class UserService {
  constructor(private http:Http) {
  }

  private usersUrl = 'api/users';  // URL to web API

  // getUsers() {
  //   return Promise.resolve(USERS);
  // }

  getUsers():Observable<User[]> {
    return this.http.get(this.usersUrl)
      .map(res => res.json() || [])
      .catch(this.handleError);
  }

  private handleError(error:any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
