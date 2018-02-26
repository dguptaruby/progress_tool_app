import { Component, OnInit } from '@angular/core';
import templateString from '../templates/milestones.component.html'
import { MilestonesService } from '../services/milestones.service';
import { Observable } from 'rxjs/Rx';
import { Routes, RouterModule, Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-milestones',
  template: templateString,
})
export class MilestonesComponent implements OnInit {

  milestones: any = [];
  show_error: string = null;
  action_item_id: string = null;

  constructor(private milestonesService: MilestonesService, private activatedRoute: ActivatedRoute) {
    this.action_item_id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getMilestones();
  }
  getMilestones() {
    this.milestonesService.getMilestones(this.action_item_id)
    .subscribe(
      response => {
        this.milestones = [response];
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
