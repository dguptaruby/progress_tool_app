import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MilestonesService {
constructor(private http:Http) { }

  getMilestones(project_id : string) {
    return this.http.get('/projects/'+project_id+'/milestones.json')
    .map((res: Response) => {
      return res["_body"];
    })
    .catch((err) => { return Observable.throw(err); });
  }
  
  delete(milestone: any) {
    var token = window.document.getElementsByName('csrf-token')[0].getAttribute("content");
    let headers = new Headers({ 'X-CSRF-Token': token });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete('/projects/'+milestone.project_id+'/milestones/'+milestone.id+'.json', options)
    .map((res: Response) => res.json())
    .catch((err) => { return Observable.throw(err); }); 
  }

  getMilestoneById(project_id : string, milestone_id: number) {
    return this.http.get('/projects/'+project_id+'/milestones/'+milestone_id+'.json')
    .map((res: Response) => res.json())
    .catch((err) => { return Observable.throw(err); });
  }

}