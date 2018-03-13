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

import { UserService }   from './services/user.service';
import { StatusService }   from './services/status.service';
import { MilestonesService }   from './services/milestones.service';
import { ActionItemsService }   from './services/actionitems.service';
import { NotesService }   from './services/notes.service';
import { ListService }   from './services/list.service';

import { Globals } from './globals';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'projects', component: ListComponent },
  { path: 'projects/:id/milestones', component: MilestonesComponent },
  { path: 'projects/:id/milestones/:milestone_id', component: MilestonesViewComponent },
  {
    path: 'users',
    component: ActionItemsComponent,
    children: [
      { path: '', component: UsersListComponent },  
    ]
  }
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
    ListComponent
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
    NgPipesModule
  ],
  providers: [ UserService, StatusService, MilestonesService, ActionItemsService, NotesService, ListService, Globals ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
