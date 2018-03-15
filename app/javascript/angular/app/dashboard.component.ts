import { Component, OnInit } from '@angular/core';
import templateString from './templates/dashboard.component.html'
import { UserService } from './services/user.service';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-dashboard',
  template: templateString,
})
export class DashboardComponent implements OnInit {
  current_user: any;
  role: string = null;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.userService.getCurrentUsers()
    .subscribe(
      response => {
        this.current_user = JSON.parse(response).data;
        this.role = JSON.parse(response).type;
      },
      error => {
        return Observable.throw(error);
      }
    );
  }
}
