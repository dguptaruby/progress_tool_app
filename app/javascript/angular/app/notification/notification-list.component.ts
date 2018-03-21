import { Component, OnInit } from '@angular/core';
import templateString from '../templates/notification/notification-list.component.html';
import { Observable } from 'rxjs/Rx';

import { NotificationService } from '../services/notification.service'
import { UserService }   from '../services/user.service';

@Component({
  selector: 'notification-list',
  template: templateString
})

export class NotificationListComponent implements OnInit {

  notifications: any = [];
  current_user: any;
  current_user_type: string = null;

  constructor(private notificationService: NotificationService, private userService: UserService) {
  }

  ngOnInit() {
    this.getCurrentUser();
    this.getAllNotification();
  }

  getCurrentUser() {
    this.userService.getCurrentUsers()
    .subscribe(
      response => {
        this.current_user = JSON.parse(response).data;
        this.current_user_type = JSON.parse(response).type;
      },
      error => {
        return Observable.throw(error);
      }
    );
  }

  getAllNotification(){
    this.notificationService.getAllNotification()
    .subscribe(
      response => {
        this.prepare_notification(response);
      },
      error => {
        return Observable.throw(error);
      }
    );
  }

  prepare_notification(data: any) {
    for (let i = 0; i <= data.length - 1; i++) {
      let obj = data[i];
      let prepared_obj = this.notificationService.prepare_notification(obj,this.current_user_type);
      this.notifications.unshift(prepared_obj);
    }
  }

}