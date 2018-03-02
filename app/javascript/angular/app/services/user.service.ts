import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {
constructor(private http:Http) { }

  getUsers() {
    return this.http.get('/users.json').map((res: Response) => res.json());
  }

  getCurrentUsers() {
    return this.http.get('/users/get_current_user').map((res: Response) => { 
      return res["_body"];
    });
  }

  sendInvitation(data: any) {
    var token = window.document.getElementsByName('csrf-token')[0].getAttribute("content");
    let headers = new Headers({ 'X-CSRF-Token': token });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('/users/invitation.json', {'user':data}, options).map((res: Response) => res.json());
  }

  formatForServer(date): string {
    let stringDate: string = ""; 
    if(date) {
        stringDate += date.day ? date.day + "/" : "";
        stringDate += date.month ? date.month + "/" : "";
        stringDate += date.year;
    }
    return stringDate;
  }
}