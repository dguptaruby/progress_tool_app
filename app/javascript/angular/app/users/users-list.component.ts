import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import templateString from '../templates/users/users-list.component.html'
import { Observable } from 'rxjs/Rx';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { DataTableDirective } from 'angular-datatables';

import { UserService }   from '../services/user.service';
import { ListService } from '../services/list.service';

@Component({
  selector: 'users-list',
  template: templateString
})
export class UsersListComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  users: any = [];
  lists: any = [];
  show_error: string; 
  inviteForm: FormGroup;
  show_form: boolean = false;
  success_message: string = null;


  constructor(private fb: FormBuilder, private userService: UserService, private listService: ListService) {
    
  }

  ngOnInit() {
    this.inviteForm = this.fb.group({
      'first_name': [null, Validators.required],
      'last_name': [null],
      'email': [null, Validators.required],
      'project_id': [null, Validators.required]
    });
    this.getUsers();
    this.getLists();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }


  getUsers() {
    this.userService.getUsers()
    .subscribe(
      response => {
        this.users = response;
        for(let i=0; i<=this.users.length-1; i++) {
          if(this.users[i].projects.length > 0){
            this.users[i].project_list = "";
            for (let j=0; j <= this.users[i].projects.length-1; j++) {
              if(this.users[i].project_list == ""){
                this.users[i].project_list = this.users[i].projects[j].project_name;
              } else {
                this.users[i].project_list = this.users[i].project_list+" | "+this.users[i].projects[j].project_name;
              }
            }
          }
        }
        if(this.users.length > 0)
          this.triggerDt();
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    );
  }

  rerender(){
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  inviteUser(data: any) {
    this.userService.sendInvitation(data)
    .subscribe(
      response => {
        this.success_message = "Invitation has been sent to user.";
        this.inviteForm.reset();
        this.cancel();
        this.getUsers();
        
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

  addNew() {
    this.show_error = null;
    this.success_message = null;
    this.show_form = true;
    this.inviteForm.reset();
  }

  cancel() {
    this.show_form = false;
  }

  triggerDt() {
    if(this.dtElement.dtInstance) {
      this.rerender();
    } else {
      this.dtTrigger.next();
    }
  }
  
}
