import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  current_user: any;
  show_error: string;
  lists: any = [];
  show_form: boolean = false;
  listForm: FormGroup;

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
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      
    };
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
        this.lists = response.data;
        if(this.lists.length > 0)
          this.triggerDt();
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
      'name': list.attributes.name,
      'description': list.attributes.description,
      'admin_id': this.current_user.id, 
    });
  }

  cancel(list: any) {
    list.isEditing = false;
    this.listForm.reset();
  }

  delete(list:any, index:number) {
    if(confirm("Are you sure want to delete this "+list.attributes.name+" list?")) {
      this.listService.delete(list.id).subscribe(response =>{
        this.lists.splice(index, 1);
        if(this.lists.length > 0) {
          this.triggerDt();
        } else {
          this.destroyInstance();
        }
      });
    }
  }

  triggerDt() {
    if(this.dtElement.dtInstance) {
      this.rerender();
    } else {
      this.dtTrigger.next();
    }
  }

  destroyInstance() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.clear();
    });
  }

  rerender(){
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
}