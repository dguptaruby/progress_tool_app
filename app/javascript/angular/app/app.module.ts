import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeAgoPipe } from 'time-ago-pipe';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { MilestonesComponent } from './milestones/milestones.component';
import { MilestonesFormComponent } from './milestones/milestones-form.component';
import { MilestonesViewComponent } from './milestones/milestones-view.component';
import { ActionItemsComponent } from './action_items/actionitems.component';
import { ActionItemsListComponent } from './action_items/actionitemslist.component';
import { ActionItemsFormComponent } from './action_items/actionitemsform.component';
import { UsersListComponent } from './users/users-list.component';
import { NoteFormComponent } from './notes/notes-form.component';
import { UsersInviteComponent } from './users/user-invite.component';

import { UserService }   from './services/user.service';
import { StatusService }   from './services/status.service';
import { MilestonesService }   from './services/milestones.service';
import { ActionItemsService }   from './services/actionitems.service';
import { NotesService }   from './services/notes.service';

const routes: Routes = [
  { path: '', component: DashboardComponent },  
  {
    path: 'action_items',
    component: ActionItemsComponent,
    children: [
      { path: '', component: ActionItemsListComponent },  
      { path: 'new', component: ActionItemsFormComponent },
      { path: ':id/edit', component: ActionItemsFormComponent }
    ]
  },
  {
    path: 'users',
    component: ActionItemsComponent,
    children: [
      { path: '', component: UsersListComponent },  
      { path: 'invitation/new' , component: UsersInviteComponent},  
      { path: ':id/milestones', component: MilestonesComponent },
      { path: ':id/milestones/new', component: MilestonesFormComponent },
      { path: ':id/milestones/:milestone_id/edit', component: MilestonesFormComponent },
      { path: ':id/milestones/:milestone_id', component: MilestonesViewComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MilestonesComponent,
    MilestonesFormComponent,
    MilestonesViewComponent,
    ActionItemsComponent,
    ActionItemsFormComponent,
    ActionItemsListComponent,
    UsersListComponent,
    NoteFormComponent,
    TimeAgoPipe,
    UsersInviteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {useHash: false}),
    NgbModule.forRoot()
  ],
  providers: [ UserService, StatusService, MilestonesService, ActionItemsService, NotesService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
