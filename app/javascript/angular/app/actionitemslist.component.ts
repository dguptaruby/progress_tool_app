import { Component, OnInit } from '@angular/core';
import templateString from './templates/actionitemslist.component.html'
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter";
import { UserService } from './services/user.service';
import { StatusService } from './services/status.service';
import { ActionItemsService }   from './services/actionitems.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'action-items-list',
  template: templateString,
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class ActionItemsListComponent implements OnInit {

  current_user: any;
  action_items: any = [];
  show_error: string; 

  constructor(private fb: FormBuilder, private userService: UserService, private actionitemsService: ActionItemsService, private parserFormatter: NgbDateParserFormatter) {
    
  }

  ngOnInit() {
    this.getCurrentUsers();
    this.getActionItems();
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

  getActionItems() {
    this.actionitemsService.getAllActionItems()
    .subscribe(
      response => {
        this.action_items = response;
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    );
  }

  delete(action_item:any, index:number) {
    if(confirm("Are you sure want to delete this action item "+action_item.name+" ?")) {
      this.actionitemsService.delete(action_item.id).subscribe(response =>{
        this.action_items.splice(index, 1);
      });
    }
  }

}
