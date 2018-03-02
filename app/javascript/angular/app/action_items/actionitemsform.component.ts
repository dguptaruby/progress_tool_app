import { Component, OnInit } from '@angular/core';
import templateString from '../templates/actionitemsform.component.html'
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "../ngb-date-fr-parser-formatter";
import { UserService } from '../services/user.service';
import { StatusService } from '../services/status.service';
import { ActionItemsService }   from '../services/actionitems.service';
import { Observable } from 'rxjs/Rx';
import { Routes, RouterModule, Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'action-item-form',
  template: templateString,
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class ActionItemsFormComponent implements OnInit {

  actionitemForm: FormGroup;
  status_list: any = [];
  current_user: any;
  users: any = [];
  show_error: string = null;
  success_message: string = null;
  action_item_id: number = null;

  constructor(private fb: FormBuilder, private userService: UserService, private actionitemsService: ActionItemsService, private parserFormatter: NgbDateParserFormatter, private activatedRoute: ActivatedRoute) {
    this.action_item_id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.actionitemForm = this.fb.group({
      'id': [null],
      'name': [null, Validators.required],
      'description': [null, Validators.required],
      'due_at': [null, Validators.required], 
      'submitted_at': [null], 
      'user_id': [null, Validators.required], 
      'admin_id': [null]
    });
    this.getUsers();
    this.getCurrentUsers();
    if(this.action_item_id) {
      this.getUserForEdit();
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

  saveData(data: any) {
    data.due_at = this.userService.formatForServer(data.due_at);
    data.submitted_at = this.userService.formatForServer(data.submitted_at);
    data.admin_id = this.current_user.id;

    this.show_error = null;
    this.success_message = null;
    this.actionitemsService.saveData(data)
    .subscribe(
      data => {
        if(!this.action_item_id)
        this.actionitemForm.reset();
        this.success_message = "Action item has been saved."
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    );
  }

  getUserForEdit() {
    this.actionitemsService.getUserForEdit(this.action_item_id)
    .subscribe(
      data => {
        this.actionitemForm.setValue({
          'id': data.id,
          'name': data.name,
          'description': data.description,
          'due_at': this.parserFormatter.parse(data.due_at), 
          'submitted_at': this.parserFormatter.parse(data.submitted_at), 
          'user_id': data.user_id, 
          'admin_id': data.admin_id
        })
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    );
  }

}
