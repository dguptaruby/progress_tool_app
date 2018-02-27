import { Component, OnInit } from '@angular/core';
import templateString from '../templates/notes/note-form.component.html'
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Routes, RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';

import { UserService } from '../services/user.service';

@Component({
  selector: 'note-form',
  template: templateString
})
export class NoteFormComponent implements OnInit {

  noteForm: FormGroup;
  current_user: any;
  show_error: string = null;
  success_message: string = null;
  user_id: string = null;
  milestone_id: string = null;
  myFiles:string [] = [];
  attachments:string [] = [];
  current_user_type: string = null;

  constructor(private fb: FormBuilder, 
    private userService: UserService, 
    private activatedRoute: ActivatedRoute, 
    private http: Http,
    ) {

    this.user_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.milestone_id = this.activatedRoute.snapshot.paramMap.get('milestone_id');
  }

  ngOnInit() {
    this.noteForm = this.fb.group({
      'id': [null],
      'content': [null, Validators.required],
      'current_user_id': [null], 
      'attachments': [[]],
    });
    this.getCurrentUsers();
    
  }

  getFileDetails (e) {
    for (var i = 0; i < e.target.files.length; i++) { 
      console.log(e.target.files[i]);
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
      console.log(this.myFiles[i]);
      formData.append(`${key}[]`, this.myFiles[i]);
    }

    this.show_error = null;
    this.success_message = null;

    var token = window.document.getElementsByName('csrf-token')[0].getAttribute("content");
        let headers = new Headers({ 'X-CSRF-Token': token });
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let http_call: any = null;
    // if(!this.milestone_id) {
      http_call = this.http.post('/notes.json', formData , options);
    /*} else {
      http_call = this.http.put('/users/'+this.user_id+'/milestones/'+data.id+'.json', formData , options);

    }*/
    
    http_call.map(res => res.json())
    .catch(error => { 
      this.show_error = error;
      Observable.throw(error)
    })
    .subscribe(
        data => {
          this.noteForm.reset();
          let formData:FormData = new FormData();
          this.success_message = "Milestone has been saved."
        },
        error => {
          console.log(error);
          this.show_error = error;
          return Observable.throw(error);
        }
    )
  }

  
}
