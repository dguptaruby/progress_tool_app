import { Component, OnInit, ViewChild } from '@angular/core';
import templateString from '../templates/milestones.component.html';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "../ngb-date-fr-parser-formatter";
import { Routes, RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';
import { DataTablesModule } from 'angular-datatables';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';

import { MilestonesService } from '../services/milestones.service';
import { UserService } from '../services/user.service';
import { StatusService } from '../services/status.service';
import { ListService } from '../services/list.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-milestones',
  template: templateString,
  providers: [ Globals, {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class MilestonesComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  milestones: any = [];
  show_error: string = null;
  success_message: string = null;
  project_id: string = null;
  current_user: any;
  current_user_type: string = null;

  milestoneForm: FormGroup;
  status_list: any = [];
  myFiles:string [] = [];
  show_form: boolean = false;
  attachments:string [] = [];
  project: any = {};
  bash_path: string = null;

  constructor(private milestonesService: MilestonesService, private userService: UserService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private statusService: StatusService, private parserFormatter: NgbDateParserFormatter, private http: Http, private listService: ListService, private globals: Globals) {
    this.project_id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getMilestones();
    this.getCurrentUser();
    this.getStatus();
    this.getProject();
    this.milestoneForm = this.fb.group({
      'id': [null],
      'name': [null, Validators.required],
      'status_id': [null, Validators.required], 
      'description': [null],
      'submission_due_at': [null], 
      'submitted_at': [null], 
      'attachments': [[]],
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      
    };
    this.bash_path = this.globals.getbashPath();
  }

  getProject() {
    this.listService.getProject(this.project_id)
    .subscribe(
      response => {
        this.project = response;
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    );
  }
  getMilestones() {
    this.milestonesService.getMilestones(this.project_id)
    .subscribe(
      response => {
        this.milestones = JSON.parse(response);
        if(this.milestones.length > 0)
          this.triggerDt();
        
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    );
  }

  getCurrentUser() {
    this.userService.getCurrentUsers()
    .subscribe(
      response => {
        this.current_user = JSON.parse(response).data;
        this.current_user_type = JSON.parse(response).type;
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

  addNew() {
    this.show_form = true;
    this.milestoneForm = this.fb.group({
      'id': [null],
      'name': [null, Validators.required],
      'status_id': [null, Validators.required], 
      'description': [null],
      'submission_due_at': [null], 
      'submitted_at': [null], 
      'attachments': [[]]
    });
  }

  delete(milestone:any, index:number) {

    if(confirm("Are you sure want to delete this milestone "+milestone.name+" ?")) {
      this.milestonesService.delete(milestone).subscribe(response =>{
        this.show_form = false;
        this.milestoneForm.reset();
        this.milestones.splice(index, 1);
        if(this.milestones.length > 0) {
          this.triggerDt();
        } else {
          this.destroyInstance();
        }
      });
    }
  }

  getFileDetails (e) {
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
    }
  }

  saveDataWithFile(data: any) {

    let formData:FormData = new FormData();
    formData.append('milestone[name]', data.name);
    formData.append('milestone[description]', data.description);
    formData.append('milestone[submission_due_at]', this.userService.formatForServer(data.submission_due_at));
    formData.append('milestone[submitted_at]', this.userService.formatForServer(data.submitted_at));
    formData.append('milestone[status_id]', data.status_id);
    formData.append('milestone[project_id]', this.project_id);

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
    if(!data.id) {
      http_call = this.http.post('/projects/'+this.project_id+'/milestones.json', formData , options);
    } else {
      http_call = this.http.put('/projects/'+this.project_id+'/milestones/'+data.id+'.json', formData , options);

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
        this.show_form = false;
        this.success_message = "Milestone Created.";
        this.getMilestones();
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    )
  }

  update(milestone: any) {
    this.show_form = true;
    milestone.isEditing = true;
    this.milestoneForm.setValue({
      'id': milestone.id,
      'name': milestone.name,
      'status_id': milestone.status, 
      'description': milestone.description,
      'submission_due_at': this.parserFormatter.parse(milestone.submission_due_at), 
      'submitted_at': this.parserFormatter.parse(milestone.submitted_at), 
      'attachments': [[]]
    });
    this.attachments = milestone.attachemnts;
  }

  cancel() {
    this.show_form = false;
    this.milestoneForm.reset();
    let formData:FormData = new FormData();
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
