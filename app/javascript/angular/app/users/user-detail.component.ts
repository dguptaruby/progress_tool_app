import { Component, OnInit } from '@angular/core';
import templateString from '../templates/users/user-detail.component.html'
import { Observable } from 'rxjs/Rx';
import { Routes, RouterModule, Router, ActivatedRoute, Params } from '@angular/router';

import { UserService }   from '../services/user.service';

@Component({
  selector: 'users-list',
  template: templateString
})
export class UsersDetailComponent implements OnInit {

  user: any = [];
  user_id: string = null;
  project_id: string = null;
  current_user: any;
  current_user_type: string = null;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {
    this.user_id = this.activatedRoute.snapshot.paramMap.get('id?p_id=:project_id');
    this.project_id = this.activatedRoute.snapshot.queryParams.project_id;
  }

  ngOnInit() {
    this.getUserDetails();
    this.getCurrentUser();
  }

  getUserDetails(){
    this.userService.getUserDetails(this.user_id, this.project_id)
    .subscribe(
      response => {
        this.user = response;
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
