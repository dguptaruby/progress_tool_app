import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ListService {
  
  constructor(private http:Http) { }

  getLists() {
    return this.http.get('/projects.json')
    .map((res: Response) => res.json())
    .catch((err) => { return Observable.throw(err); });
  }

  getOptions() {
    var token = window.document.getElementsByName('csrf-token')[0].getAttribute("content");
    let headers = new Headers({ 'X-CSRF-Token': token });
    let options = new RequestOptions({ headers: headers });
    return options;
  }

  save(data) {
    let options = this.getOptions();
    let http_call : any;
    if(data.id) {
      http_call =this.http.put('/projects/'+ data.id+'.json', {'project': data}, options )
    } else {
      http_call = this.http.post('/projects.json', {'project': data}, options )
    }
    return http_call
    .map((res: Response) => res.json())
    .catch((err) => { return Observable.throw(err); });
  }

  delete(id: number) {
    let options = this.getOptions();
    return this.http.delete('/projects/'+id+'.json', options)
    .map((res: Response) => res.json())
    .catch((err) => { return Observable.throw(err); }); 
  }

  getProject(project_id: string) {
    return this.http.get('/projects/'+project_id+'.json')
    .map((res: Response) => res.json())
    .catch((err) => { return Observable.throw(err); });
  }

  add_users_to_list(data: any) {
    let options = this.getOptions();

    return this.http.post('/invitation/invite_users_to_list.json', data, options )
    .map((res: Response) => res.json())
    .catch((err) => { return Observable.throw(err); });
  }
  
}