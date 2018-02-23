import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {
constructor(private http:Http) { }

  getUsers() {
    return this.http.get('/users').map((res: Response) => res.json());
  }

  getCurrentUsers() {
    return this.http.get('/users/get_current_user').map((res: Response) => res.json());
  }
}