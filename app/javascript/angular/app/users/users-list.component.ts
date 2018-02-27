import { Component, OnInit } from '@angular/core';
import templateString from '../templates/users/users-list.component.html'
import { UserService }   from '../services/user.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'users-list',
  template: templateString
})
export class UsersListComponent implements OnInit {

  users: any = [];
  show_error: string; 

  constructor(private userService: UserService) {
    
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
    .subscribe(
      response => {
        this.users = response;
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    );
  }

}
