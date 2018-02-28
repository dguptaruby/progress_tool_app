import { Component, OnInit } from '@angular/core';
import templateString from '../templates/milestones.component.html'
import { MilestonesService } from '../services/milestones.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Rx';
import { Routes, RouterModule, Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-milestones',
  template: templateString,
})
export class MilestonesComponent implements OnInit {

  milestones: any = [];
  show_error: string = null;
  user_id: string = null;
  current_user: any;
  current_user_type: string = null;

  constructor(private milestonesService: MilestonesService, private userService: UserService, private activatedRoute: ActivatedRoute) {
    this.user_id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getMilestones();
    this.getCurrentUser();

  }
  getMilestones() {
    this.milestonesService.getMilestones(this.user_id)
    .subscribe(
      response => {
        this.milestones = JSON.parse(response);
      },
      error => {
        this.show_error = error;
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
        this.show_error = error;
        return Observable.throw(error);
      }
    );
  }

  delete(milestone:any, index:number) {
    if(confirm("Are you sure want to delete this milestone "+milestone.name+" ?")) {
      this.milestonesService.delete(milestone).subscribe(response =>{
        this.milestones.splice(index, 1);
      });
    }
  }
}
