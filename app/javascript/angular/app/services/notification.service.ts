import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class NotificationService {
constructor(private http:Http) { }

  getNotification() {
    return this.http.get('/notifications.json').map((res: Response) => res.json());
  }

}