import { Component, OnInit } from '@angular/core';
import templateString from '../templates/notification/notification.component.html';
import { Ng2Cable, Broadcaster } from 'ng2-cable';
import { Observable } from 'rxjs/Rx';
import { Globals } from '../globals';

import { NotificationService } from '../services/notification.service'
import { UserService }   from '../services/user.service';

@Component({
  selector: '.in-app-notification', // class name
  template: templateString,
  providers: [ Globals ]
})

export class NotificationComponent implements OnInit {

  cable:any;
  notifications: any = [];
  notification_count: number = 0;
  bash_path: string = null;
  current_user: any;
  current_user_type: string = null;

  constructor(private ng2cable: Ng2Cable, private broadcaster: Broadcaster, private notificationService: NotificationService, private globals: Globals, private userService: UserService) {
  }

  ngOnInit() {
    this.getCurrentUser();
    this.bash_path = this.globals.getbashPath();
    this.getNotification();
    this.cableSubscribe();
  }

  cableSubscribe() {
    this.ng2cable.subscribe(this.bash_path+'/cable', 'NotificationsChannel');
    this.broadcaster.on<any>('NotificationsChannel').subscribe(
      message => {
        this.prepare_notification([message.notification]);
      }
    );
  }

  getNotification(){
    this.notificationService.getNotification()
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
      this.notification_count = this.notification_count+1;
    }
  }

  mark_as_read() {
    this.notificationService.markAsRead()
    .subscribe(
      response => {
        this.notification_count = 0;
      },
      error => {
        return Observable.throw(error);
      }
    );

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
}