import { Component, OnInit } from '@angular/core';
import templateString from '../templates/users/user-invite.component.html'
import { Observable } from 'rxjs/Rx';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { UserService }   from '../services/user.service';
import { ListService } from '../services/list.service';

@Component({
  selector: 'users-list',
  template: templateString
})
export class UsersInviteComponent implements OnInit {

  users: any = [];
  show_error: string; 
  success_message: string; 
  inviteForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.inviteForm = this.fb.group({
      'full_name': [null, Validators.required],
      'email': [null, Validators.required]
    });
  }

  ngOnInit() {

  }

  inviteUser(data: any) {
    this.userService.sendInvitation(data)
    .subscribe(
      response => {
        this.success_message = "Invitation has been sent to user.";
        this.inviteForm.reset();
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    );
  }

}
