import { Component, OnInit } from '@angular/core';
import templateString from '../templates/actionitems.component.html'
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-action-items',
  template: templateString,
})
export class ActionItemsComponent implements OnInit {

  current_user: any;
  show_error: string;
  
  constructor(private userService: UserService) {
    
  }

  ngOnInit() {
    this.getCurrentUsers();
  }
  getCurrentUsers() {
    this.userService.getCurrentUsers()
    .subscribe(
      response => {
        this.current_user = response.data;
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    );
  }

}
