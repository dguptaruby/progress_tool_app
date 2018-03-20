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
  channel_path: string = null;
  current_user: any;
  current_user_type: string = null;

  constructor(private ng2cable: Ng2Cable, private broadcaster: Broadcaster, private notificationService: NotificationService, private globals: Globals, private userService: UserService) {
  }

  ngOnInit() {
    this.getCurrentUser();
    this.bash_path = this.globals.getbashPath();
    this.channel_path = this.globals.getChannelPath();
    this.getNotification();
    this.cableSubscribe();
  }

  cableSubscribe() {
    this.ng2cable.subscribe(this.channel_path + '/cable', 'NotificationsChannel', { id: 1 });

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
      let text = null;
      if(this.current_user_type == 'Admin') {
        text = obj.actor_name+ " " + obj.action + " "+ obj.invited_user_name + " to " + obj.project_name;
      } else {
        text = 'You are ' + obj.action + " by "+ obj.actor_name + " to " + obj.project_name;
      }

      let url ="/users/"+obj.user_id+"?project_id="+obj.project_id;
      this.notifications.unshift({"text": text, "url": url, "created_at": data[i].created_at});
      this.notification_count = this.notification_count+1;
    }

    /*this.notifications = this.notificationService.prepare_notification(data,this.current_user_type);
    this.notification_count = this.notifications.length;*/
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