import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MilestonesService {
constructor(private http:Http) { }

  saveData(data: any) {
    // let body = JSON.stringify(data);

    var token = window.document.getElementsByName('csrf-token')[0].getAttribute("content");
    let headers = new Headers({ 'X-CSRF-Token': token });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('/milestones.json', {'milestone': data}, options ).map((res: Response) => res.json());
  }

  deleteUser(id: number) {
    return this.http.delete('/api/users/'+id).map((res: Response) => res.json()); 
  }

}