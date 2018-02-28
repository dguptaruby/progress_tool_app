import { Component, OnInit } from '@angular/core';
import templateString from '../templates/milestones-form.component.html'
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "../ngb-date-fr-parser-formatter";
import { Observable } from 'rxjs/Rx';
import { Routes, RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';

import { UserService } from '../services/user.service';
import { StatusService } from '../services/status.service';
import { MilestonesService } from '../services/milestones.service';
import { ActionItemsService } from '../services/actionitems.service';

@Component({
  selector: 'app-milestones',
  template: templateString,
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class MilestonesFormComponent implements OnInit {

  milestoneForm: FormGroup;
  status_list: any = [];
  current_user: any;
  action_items: any = [];
  show_error: string = null;
  success_message: string = null;
  user_id: string = null;
  milestone_id: number = null;
  myFiles:string [] = [];
  attachments:string [] = [];

  constructor(private fb: FormBuilder, 
    private userService: UserService, 
    private statusService: StatusService, 
    private milestonesService: MilestonesService, 
    private parserFormatter: NgbDateParserFormatter, 
    private activatedRoute: ActivatedRoute, 
    private http: Http,
    private actionitemsService: ActionItemsService,
    ) {

    this.user_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.milestone_id = Number(this.activatedRoute.snapshot.paramMap.get('milestone_id'));
  }

  ngOnInit() {
    this.milestoneForm = this.fb.group({
      'id': [null],
      'name': [null, Validators.required],
      'description': [null, Validators.required],
      'submission_due_at': [null, Validators.required], 
      'submitted_at': [null, Validators.required], 
      'status_id': [null, Validators.required], 
      'action_item_id': [null, Validators.required], 
      'admin_id': [null], 
      'attachments': [[]],
      'user_id': this.user_id
    });
    this.getActionItems();
    this.getStatus();
    this.getCurrentUsers();
    if(this.milestone_id)
      this.getMilestoneById();
  }

  getFileDetails (e) {
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
    }
  }

  getCurrentUsers() {
    this.userService.getCurrentUsers()
    .subscribe(
      response => {
        this.current_user = JSON.parse(response).data;
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    );
  }

  getActionItems() {
    this.actionitemsService.getAllActionItems()
    .subscribe(
      response => {
        this.action_items = response.data;
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    );
  }

  getStatus() {
    this.statusService.getStatus()
    .subscribe(
      response => {
        this.status_list = response.data;
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    );
  }

  saveDataWithFile(data: any) {

    let formData:FormData = new FormData();
    formData.append('milestone[name]', data.name);
    formData.append('milestone[description]', data.description);
    formData.append('milestone[submission_due_at]', this.parserFormatter.format(data.submission_due_at));
    formData.append('milestone[submitted_at]', this.parserFormatter.format(data.submitted_at));
    formData.append('milestone[action_item_id]', data.action_item_id);
    formData.append('milestone[status_id]', data.status_id);
    formData.append('milestone[admin_id]', this.current_user.id);
    formData.append('milestone[user_id]', this.user_id);

    let  key = 'milestone[attachments]'
    for (var i = 0; i < this.myFiles.length; i++) { 
      formData.append(`${key}[]`, this.myFiles[i]);
    }

    this.show_error = null;
    this.success_message = null;

    var token = window.document.getElementsByName('csrf-token')[0].getAttribute("content");
        let headers = new Headers({ 'X-CSRF-Token': token });
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let http_call: any = null;
    if(!this.milestone_id) {
      http_call = this.http.post('/users/'+this.user_id+'/milestones.json', formData , options);
    } else {
      http_call = this.http.put('/users/'+this.user_id+'/milestones/'+data.id+'.json', formData , options);

    }
    
    http_call.map(res => res.json())
    .catch(error => { 
      this.show_error = error;
      Observable.throw(error)
    })
    .subscribe(
        data => {
          this.milestoneForm.reset();
          let formData:FormData = new FormData();
          this.success_message = "Milestone has been saved."
        },
        error => {
          this.show_error = error;
          return Observable.throw(error);
        }
    )
  }

  getMilestoneById() {
    this.milestonesService.getMilestoneById(this.user_id, this.milestone_id)
    .subscribe(
      data => {
        this.milestoneForm.setValue({
          'id': data.id,
          'name': data.name,
          'description': data.description,
          'submission_due_at': this.parserFormatter.parse(data.submission_due_at), 
          'submitted_at': this.parserFormatter.parse(data.submitted_at), 
          'user_id': data.user_id, 
          'status_id': data.status_id, 
          'admin_id': data.admin_id,
          'attachments': [[]],
          'action_item_id': data.action_item_id
        });
        this.attachments = data.attachments;
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    );
  }
}
