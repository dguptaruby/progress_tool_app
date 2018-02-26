import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MilestonesService {
constructor(private http:Http) { }

  saveData(data: FormData, action_item_id : string) {
    console.log("service = ",data);
    // debugger
    var token = window.document.getElementsByName('csrf-token')[0].getAttribute("content");
    let headers = new Headers({ 'X-CSRF-Token': token });
    headers.append('Accept', 'application/json');

    let options = new RequestOptions({ headers: headers });
    let http_call : any;
    /*if(data.id) {
      http_call = this.http.put('/action_items/'+action_item_id+'/milestones/'+ data.id +'.json', {'milestone': data}, options );
    } else {
      http_call = this.http.post('/action_items/'+action_item_id+'/milestones.json', {'milestone': data}, options );
    }*/
    return this.http.post('/action_items/'+action_item_id+'/milestones.json', {'milestone': data}, options ).map((res: Response) => res.json());
  }

  getMilestones(action_item_id : string) {
    return this.http.get('/action_items/'+action_item_id+'/milestones.json')
    .map((res: Response) => res.json())
    .catch((err) => { return Observable.throw(err); });
  }
  
  delete(milestone: any) {
    var token = window.document.getElementsByName('csrf-token')[0].getAttribute("content");
    let headers = new Headers({ 'X-CSRF-Token': token });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete('/action_items/'+milestone.action_item_id+'/milestones/'+milestone.id+'.json', options)
    .map((res: Response) => res.json())
    .catch((err) => { return Observable.throw(err); }); 
  }

  getMilestoneById(action_item_id : string, milestone_id: number) {
    return this.http.get('/action_items/'+action_item_id+'/milestones/'+milestone_id+'.json')
    .map((res: Response) => res.json())
    .catch((err) => { return Observable.throw(err); });
  }

}