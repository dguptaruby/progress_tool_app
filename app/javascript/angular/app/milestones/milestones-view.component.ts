import { Component, OnInit } from '@angular/core';
import templateString from '../templates/milestones-view.component.html'
import { MilestonesService } from '../services/milestones.service';
import { Observable } from 'rxjs/Rx';
import { Routes, RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'app-milestones-view',
  template: templateString,
  providers: [ Globals ]
})
export class MilestonesViewComponent implements OnInit {

  milestone: any = null;
  show_error: string = null;
  user_id: string = null;
  milestone_id: number = null;
  bash_path: string = null;

  constructor(private milestonesService: MilestonesService, private activatedRoute: ActivatedRoute, private globals: Globals) {
    this.user_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.milestone_id = Number(this.activatedRoute.snapshot.paramMap.get('milestone_id'));

  }

  ngOnInit() {
    this.getMilestone();
    this.bash_path = this.globals.getbashPath();
  }
  getMilestone() {
    this.milestonesService.getMilestoneById(this.user_id, this.milestone_id)
    .subscribe(
      data => {
        this.milestone = data;
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    );
  }
}
