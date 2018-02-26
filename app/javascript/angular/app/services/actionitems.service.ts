import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ActionItemsService {
constructor(private http:Http) { }

  saveData(data: any) {
    var token = window.document.getElementsByName('csrf-token')[0].getAttribute("content");
    let headers = new Headers({ 'X-CSRF-Token': token });
    let options = new RequestOptions({ headers: headers });
    let http_call : any;
    if(data.id) {
      http_call =this.http.put('/action_items/'+ data.id+'.json', {'action_item': data}, options )
    } else {
      http_call = this.http.post('/action_items.json', {'action_item': data}, options )
    }
    return http_call
    .map((res: Response) => res.json())
    .catch((err) => { return Observable.throw(err); });
  }

  getAllActionItems() {
    return this.http.get('/action_items.json')
    .map((res: Response) => res.json())
    .catch((err) => { return Observable.throw(err); });
  }

  delete(id: number) {
    var token = window.document.getElementsByName('csrf-token')[0].getAttribute("content");
    let headers = new Headers({ 'X-CSRF-Token': token });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete('/action_items/'+id+'.json', options)
    .map((res: Response) => res.json())
    .catch((err) => { return Observable.throw(err); }); 
  }

  getUserForEdit(id: number) {
    return this.http.get('/action_items/'+ id +'.json')
    .map((res: Response) => res.json())
    .catch((err) => { return Observable.throw(err); });
  }

}