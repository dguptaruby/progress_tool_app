import { Component, OnInit } from '@angular/core';
import templateString from './templates/milestones.component.html'
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter";
import { UserService } from './services/user.service';
import { StatusService } from './services/status.service';
import { MilestonesService } from './services/milestones.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-milestones',
  template: templateString,
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class MilestonesComponent implements OnInit {

  milestoneForm: FormGroup;
  status_list: any = [];
  current_user: any;
  users: any = [];
  show_error: string = null;

  constructor(private fb: FormBuilder, private userService: UserService, private statusService: StatusService, private milestonesService: MilestonesService, private parserFormatter: NgbDateParserFormatter) {
    
  }

  ngOnInit() {
    this.milestoneForm = this.fb.group({
      'name': [null, Validators.required],
      'description': [null, Validators.required],
      'submission_due_at': [null, Validators.required], 
      'submitted_at': [null, Validators.required], 
      'status_id': [null, Validators.required], 
      'user_id': [null, Validators.required], 
      'admin_id': [null, Validators.required], 
      'attachments': [[]]
      // 'attachments': [this.fb.array([])]
    });
    this.getUsers();
    this.getStatus();
    this.getCurrentUsers();
  }
  getCurrentUsers() {
    this.userService.getCurrentUsers()
    .subscribe(
      response => {
        .log("current users = ",response);
        this.current_user = response.data;
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    );
  }

  getUsers() {
    this.userService.getUsers()
    .subscribe(
      response => {
        this.users = response.data;
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

  saveData(data: any) {
    data.submission_due_at = this.parserFormatter.format(data.submission_due_at);
    data.submitted_at = this.parserFormatter.format(data.submitted_at);
    data.admin_id = this.current_user.id;

    this.show_error = null;
    // let post_data = { 'milestone': data };
    this.milestonesService.saveData(data)
    .subscribe(
      data => {
        if(data.status == 201) {
          // this.resetForm();
        } else {
          this.show_error = data.error;
        }
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    );
  }

}
