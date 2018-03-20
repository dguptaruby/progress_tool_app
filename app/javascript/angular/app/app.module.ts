import { DataTablesModule } from 'angular-datatables';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeAgoPipe } from 'time-ago-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgPipesModule } from 'ngx-pipes';
import { Select2Module } from 'ng2-select2';
import { Ng2CableModule } from 'ng2-cable';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { MilestonesComponent } from './milestones/milestones.component';
import { MilestonesViewComponent } from './milestones/milestones-view.component';
import { ActionItemsComponent } from './action_items/actionitems.component';
import { ActionItemsListComponent } from './action_items/actionitemslist.component';
import { ActionItemsFormComponent } from './action_items/actionitemsform.component';
import { UsersListComponent } from './users/users-list.component';
import { NoteFormComponent } from './notes/notes-form.component';
import { ListComponent } from './lists/lists.component';
import { UsersDashboardComponent } from './users/users-dashboard.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationListComponent } from './notification/notification-list.component';
import { UsersDetailComponent } from './users/user-detail.component';

import { UserService }   from './services/user.service';
import { StatusService }   from './services/status.service';
import { MilestonesService }   from './services/milestones.service';
import { ActionItemsService }   from './services/actionitems.service';
import { NotesService }   from './services/notes.service';
import { ListService }   from './services/list.service';
import { NotificationService }   from './services/notification.service';

import { Globals } from './globals';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'projects', component: ListComponent },
  { path: 'projects/:id/milestones', component: MilestonesComponent },
  { path: 'projects/:id/milestones/:milestone_id', component: MilestonesViewComponent },
  {
    path: 'users',
    component: UsersListComponent,
    children: [
      { path: '', component: UsersListComponent }
    ]
  },
  { path: 'users/:id?p_id=:project_id', component: UsersDetailComponent },
  { path: 'notifications', component: NotificationListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MilestonesComponent,
    MilestonesViewComponent,
    ActionItemsComponent,
    ActionItemsFormComponent,
    ActionItemsListComponent,
    UsersListComponent,
    NoteFormComponent,
    TimeAgoPipe,
    ListComponent,
    UsersDashboardComponent,
    NotificationComponent,
    NotificationListComponent,
    UsersDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {useHash: false}),
    NgbModule.forRoot(),
    DataTablesModule,
    NgxPaginationModule,
    NgPipesModule,
    Select2Module,
    Ng2CableModule
  ],
  providers: [ UserService, StatusService, MilestonesService, ActionItemsService, NotesService, ListService, Globals, NotificationService ],
  bootstrap: [ AppComponent,NotificationComponent ]
})
export class AppModule { }
