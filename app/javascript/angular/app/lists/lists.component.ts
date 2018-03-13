import { Component, OnInit } from '@angular/core';
import templateString from '../templates/lists/lists.component.html';
import { Observable } from 'rxjs/Rx';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';

import { UserService } from '../services/user.service';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-lists',
  template: templateString,
})
export class ListComponent implements OnInit {

  current_user: any;
  show_error: string;
  lists: any = [];
  show_form: boolean = false;
  listForm: FormGroup;
  pageProject: number = 1;
  pageUser: number = 1;
  pageMilestone: number = 1;

  constructor(private userService: UserService, private listService: ListService,private fb: FormBuilder) {
    
  }

  ngOnInit() {
    this.getCurrentUsers();
    this.getLists();

    this.listForm = this.fb.group({
      'id': [null],
      'name': [null, Validators.required],
      'description': [null],
      'admin_id': [null, Validators.required], 
    });
    
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


  resetForm() {
    this.show_form = false;
    this.listForm.reset();
  }

  adnew() {
    this.listForm = this.fb.group({
      'id': [null],
      'name': [null, Validators.required],
      'description': [null],
      'admin_id': this.current_user.id, 
    });
    this.show_form = true;
    for(let obj of this.lists){
      obj.isEditing = false;
    };
  }
  
  save(data: any) {
    this.listService.save(data)
    .subscribe(
      response => {
        this.show_form = false;
        this.getLists();
        this.listForm.reset();
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    ); 
  }

  update(list: any) {
    this.resetForm();
    for(let obj of this.lists){
      obj.isEditing = false;
    };
    list.isEditing = true;
    this.listForm.setValue({
      'id': list.id,
      'name': list.name,
      'description': list.description,
      'admin_id': this.current_user.id, 
    });
  }

  cancel(list: any) {
    list.isEditing = false;
    this.listForm.reset();
  }

  delete(list:any, index:number) {
    if(confirm("Are you sure want to delete this "+list.name+" list?")) {
      this.listService.delete(list.id).subscribe(response =>{
        this.getLists();        
      });
    }
  }
  
}