import { Component, OnInit } from '@angular/core';
import templateString from '../templates/users/users-dashboard.component.html'
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

import { UserService }   from '../services/user.service';
import { ListService } from '../services/list.service';

@Component({
  selector: 'users-dashboard',
  template: templateString
})
export class UsersDashboardComponent implements OnInit {

  lists: any = [];
  show_error: string; 
  success_message: string = null;
  pageProject: number = 1;
  pageMilestone: number = 1;
  itemsPerPage: number = 10;
  
  constructor(private userService: UserService, private listService: ListService) {
    
  }

  ngOnInit() {
    this.getLists();
  }


  getLists() {
    this.listService.getLists()
    .subscribe(
      response => {
        this.lists = response;
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    ); 
  }
  
}
