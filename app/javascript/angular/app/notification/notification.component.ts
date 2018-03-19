import { Component, OnInit } from '@angular/core';
import templateString from '../templates/notification/notification.component.html';
import { Ng2Cable, Broadcaster } from 'ng2-cable';
import { Observable } from 'rxjs/Rx';

import { NotificationService } from '../services/notification.service'

@Component({
  selector: '.in-app-notification',
  template: templateString
})

export class NotificationComponent implements OnInit {

  cable:any;
  notifications: any = [];
  notification_count: number = 0;
  constructor(private ng2cable: Ng2Cable, private broadcaster: Broadcaster, private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.cableSubscribe();
    this.getAllNotification();
  }

  cableSubscribe() {
    this.ng2cable.subscribe('http://localhost:3000/cable', 'NotificationsChannel', { id: 1 });

    this.broadcaster.on<any>('NotificationsChannel').subscribe(
      message => {
        console.log(message);
        this.prepare_notification([message.notification]);

      }
    );
  }

  getAllNotification(){
    this.notificationService.getNotification()
    .subscribe(
      response => {
        console.log(response);
        this.prepare_notification(response);

      },
      error => {
        return Observable.throw(error);
      }
    );
  }

  prepare_notification(data: any) {
    for (let i = 0; i <= data.length - 1; i++) {
      console.log(data[i]);
      let text = data[i].actor_name+ " " + data[i].action + " "+ data[i].invited_user_name + " to " + data[i].project_name;
      this.notifications.unshift({"text": text, "url": "", "created_at": data[i].created_at});
      this.notification_count = this.notification_count+1;
    }
  }

  mark_as_read() {
    this.notification_count = 0;
    // this.notificationService.markAsRead()
    // .subscribe(
    //   response => {
    //     console.log(response);
    //   },
    //   error => {
    //     return Observable.throw(error);
    //   }
    // );

  }
}