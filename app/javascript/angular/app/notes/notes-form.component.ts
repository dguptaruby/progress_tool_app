import { Component, OnInit } from '@angular/core';
import templateString from '../templates/notes/note-form.component.html'
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Routes, RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';

import { UserService } from '../services/user.service';
import { NotesService } from '../services/notes.service';
import { Globals } from '../globals';

@Component({
  selector: 'note-form',
  template: templateString,
  providers: [ Globals ]
})
export class NoteFormComponent implements OnInit {

  noteForm: FormGroup;
  current_user: any;
  show_error: string = null;
  success_message: string = null;
  project_id: string = null;
  milestone_id: string = null;
  myFiles:string [] = [];
  attachments:string [] = [];
  current_user_type: string = null;
  notes: any = [];
  bash_path: string = null;

  constructor(private fb: FormBuilder, 
    private userService: UserService, 
    private activatedRoute: ActivatedRoute, 
    private http: Http,
    private notesService: NotesService,
    private globals: Globals
    ) {

    this.project_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.milestone_id = this.activatedRoute.snapshot.paramMap.get('milestone_id');
  }

  ngOnInit() {
    this.noteForm = this.fb.group({
      'id': [null],
      'content': [null, Validators.required],
      'attachments': [[]],
    });
    this.getCurrentUsers();
    this.getNotes();
    this.bash_path = this.globals.getbashPath();

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
        this.current_user_type = JSON.parse(response).type;
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    );
  }

  getNotes() {
    this.notesService.getNotes(this.project_id, this.milestone_id)
    .subscribe(
      response => {
        this.notes = JSON.parse(response);
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    );
  }

  updateNote(data) {
    if(data.attachments.length > 0) {
      this.attachments = data.attachments;
    }

    this.noteForm.setValue({
      'id': data.id,
      'content': data.content,
      'attachments': [[]],
    });
    $("html, body").animate({ scrollTop: document.body.scrollHeight }, "slow");
  }
  
  saveDataWithFile(data: any) {

    let formData:FormData = new FormData();
    formData.append('note[content]', data.content);
    if(this.current_user_type == 'Admin') {
      formData.append('note[admin_id]', this.current_user.id);
    } else {
      formData.append('note[user_id]', this.current_user.id);
    }
    formData.append('note[milestone_id]', this.milestone_id);

    let  key = 'note[attachments]'
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
      http_call = this.http.post('/projects/'+ this.current_user.id +'/milestones/'+ this.milestone_id +'/notes.json', formData , options);
    } else {
      http_call = this.http.put('/projects/'+ this.current_user.id +'/milestones/'+ this.milestone_id +'/notes/'+data.id+'.json', formData , options);

    }
    
    http_call.map(res => res.json())
    .catch(error => { 
      this.show_error = error;
      Observable.throw(error)
    })
    .subscribe(
        data => {
          this.noteForm.reset();
          let formData:FormData = new FormData();
          this.getNotes();
          this.attachments = [];
          this.myFiles = [];
        },
        error => {
          this.show_error = error;
          return Observable.throw(error);
        }
    )
  }

  cancel() {
    this.noteForm.reset();
    let formData:FormData = new FormData();
    this.attachments = [];
  }
  
}
