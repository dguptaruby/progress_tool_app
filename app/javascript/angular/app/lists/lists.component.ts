import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import templateString from '../templates/lists/lists.component.html';
import { Observable } from 'rxjs/Rx';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Select2OptionData } from 'ng2-select2';
import { Http, Headers, RequestOptions } from '@angular/http';

import { UserService } from '../services/user.service';
import { ListService } from '../services/list.service';
import { StatusService } from '../services/status.service';

@Component({
  selector: 'app-lists',
  template: templateString,
})
export class ListComponent implements OnInit {

  current_user: any;
  show_error: string;
  lists: any = [];
  users: any = [];
  show_form: boolean = false;
  listForm: FormGroup;
  pageProject: number = 1;
  pageUser: number = 1;
  pageMilestone: number = 1;
  itemsPerPage: number = 10;
  selectedAction :string = null;


  usersForSelect: Array<Select2OptionData>;
  options: Select2Options;
  value: string[];
  current: string;
  userData: any = [];
  modalReference: any;
  invite_user_success_msg: string;
  inviteUserList: any = {};
  milestoneForm: FormGroup;
  status_list: any = [];

  inviteForm: FormGroup;

  modalOptions: NgbModalOptions = {
    windowClass: 'in',
  };


  addUserToList: any = {
    list_id: null,
    user_ids: []
  };

  constructor(private userService: UserService, private listService: ListService, private fb: FormBuilder, private modalService: NgbModal,private cdr: ChangeDetectorRef, private statusService: StatusService, private http: Http) {
    
  }

  ngOnInit() {
    this.getCurrentUsers();
    this.getLists();
    this.getUsers();
    this.getStatus();

    this.listForm = this.fb.group({
      'id': [null],
      'name': [null, Validators.required],
      'description': [null],
      'admin_id': [null, Validators.required], 
    });

    this.options = {
      multiple: true,
      placeholder: "Add users"
    }

    this.milestoneForm = this.fb.group({
      'id': [null],
      'name': [null],
      'status_id': [null],
      'project': [null]
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

  open_invite_user_modal(list: any, content) {
    this.userData = [];
    this.inviteUserList = list;
    this.invite_user_success_msg = null;
    this.value = [];
    for (let i=0; i<=this.users.length-1; i++) {
      
      let avail = list.users.find((obj) => {
        return obj.id === this.users[i].id;
      });

      if(!avail) {
        this.userData.push({id: this.users[i].id, text: this.users[i].first_name+ " " +this.users[i].last_name})
      }
    }

    this.usersForSelect = this.userData;
    this.open_modal(content);     
  }

  open_modal(content) {
    this.modalReference = this.modalService.open(content, this.modalOptions);
    this.modalReference.result.then((result) => {
    }, (reason) => {
    });

  }

  invite_user() {
    this.listService.add_users_to_list(this.addUserToList)
    .subscribe(
      response => {
        this.getLists();
        if(this.addUserToList.user_ids.length > 1) {
          this.invite_user_success_msg = "Users added to the list";
        } else {
          this.invite_user_success_msg = "User added to the list";
        }
        this.addUserToList = {
          list_id: null,
          user_ids: []
        };
        this.modalReference.close();
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    ); 

  }
  
  changed(data: {value: string[]}) {
    if(data.value) {
      this.addUserToList = {
        list_id: this.inviteUserList.id,
        user_ids: data.value
      };
    }

  }

  open_invite_new_user_modal(list: any, content) {
    this.inviteForm = this.fb.group({
      'first_name': [null, Validators.required],
      'last_name': [null, Validators.required],
      'email': [null, Validators.required],
      'project_id': list.id
    });
    this.inviteUserList = list;
    this.invite_user_success_msg = null;
    this.open_modal(content);
  } 

  inviteUser(data: any) {
    this.userService.sendInvitation(data)
    .subscribe(
      response => {
        this.getLists();
        this.invite_user_success_msg = "Invitation has been sent to user.";
        this.inviteForm.reset();
        this.modalReference.close();
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    );
  }

  onActionChange(newValue, list, i, inviteUserModal, inviteNewUserModal) {

    switch(newValue) {
      case "milestones":
        window.location.href = "/projects/"+list.id+"/milestones";
      break;

      case "delete":
        this.delete(list, i);
      break;

      case "update":
        this.update(list);
      break;

      case "invite_user":
        this.open_invite_new_user_modal(list, inviteNewUserModal);
      break; 

      case "add_user":
        this.open_invite_user_modal(list, inviteUserModal);
      break; 
    }

  }

  show_status_options(milestone:any) {
    milestone.show_dropdown = true;
    this.milestoneForm.setValue({
      'id': milestone.id,
      'name': milestone.name,
      'status_id': milestone.status_id ,
      'project': milestone.project_id 
    });
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

  closeStatusDropdown(milestone) {
    milestone.show_dropdown = false;
  }

  saveDataWithFile(data:any, milestone:any) {
    let formData:FormData = new FormData();
    formData.append('milestone[name]', data.name);
    formData.append('milestone[status_id]', data.status_id);
    formData.append('milestone[project_id]', data.project);
    var token = window.document.getElementsByName('csrf-token')[0].getAttribute("content");
        let headers = new Headers({ 'X-CSRF-Token': token });
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let http_call: any = null;
    http_call = this.http.put('/projects/'+data.project+'/milestones/'+data.id+'.json', formData , options);

    
    http_call.map(res => res.json())
    .catch(error => { 
      this.show_error = error;
      Observable.throw(error)
    })
    .subscribe(
      data => {
        this.milestoneForm.reset();
        let formData:FormData = new FormData();
        this.show_form = false;
        var statusData = this.status_list.filter(function (element, index) {
           return (element.id === data.status_id);
        });
        milestone.status_id = statusData[0].id;
        milestone.status_name = statusData[0].name;
        milestone.show_dropdown = false;
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    )
  }
}