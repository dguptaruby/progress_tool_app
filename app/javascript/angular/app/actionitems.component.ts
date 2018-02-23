import { Component, OnInit } from '@angular/core';
import templateString from './templates/actionitems.component.html'
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter";
import { UserService } from './services/user.service';
import { StatusService } from './services/status.service';
import { ActionItemsService }   from './services/actionitems.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-action-items',
  template: templateString,
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class ActionItemsComponent implements OnInit {

  // actionitemForm: FormGroup;
  current_user: any;
  show_error: string;
  
  constructor(private fb: FormBuilder, private userService: UserService, private actionitemsService: ActionItemsService, private parserFormatter: NgbDateParserFormatter) {
    
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
