import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class NotificationService {
constructor(private http:Http) { }

  getNotification() {
    return this.http.get('/notifications.json').map((res: Response) => res.json());
  }

  markAsRead() {
    return this.http.get('/notifications/mark_all_as_read.json').map((res: Response) => res.json());
  }

  getAllNotification() {
    return this.http.get('/notifications/all_notifications.json').map((res: Response) => res.json());
  }

  prepare_notification(obj: any,user_type: string) {
    let text = null;
    if(user_type == 'Admin') {
      text = obj.actor_name+ " " + obj.action + " "+ obj.invited_user_name + " to " + obj.project_name;
    } else {
      text = 'You are ' + obj.action + " by "+ obj.actor_name + " to " + obj.project_name;
    }

    let url ="/users/"+obj.user_id+"?project_id="+obj.project_id;
    let prepared_obj = {"text": text, "url": url, "created_at": obj.created_at};
    return prepared_obj;
  }
}
