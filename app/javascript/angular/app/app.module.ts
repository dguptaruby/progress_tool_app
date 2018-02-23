import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { MilestonesComponent } from './milestones.component';
import { ActionItemsComponent } from './actionitems.component';
import { ActionItemsListComponent } from './actionitemslist.component';
import { ActionItemsFormComponent } from './actionitemsform.component';
import { UserService }   from './services/user.service';
import { StatusService }   from './services/status.service';
import { MilestonesService }   from './services/milestones.service';
import { ActionItemsService }   from './services/actionitems.service';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'milestones', component: MilestonesComponent },
  
  {
    path: 'action_items',
    component: ActionItemsComponent,
    children: [
      { path: '', component: ActionItemsListComponent },  
      { path: 'new', component: ActionItemsFormComponent },
      { path: ':id/edit', component: ActionItemsFormComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MilestonesComponent,
    ActionItemsComponent,
    ActionItemsFormComponent,
    ActionItemsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {useHash: false}),
    NgbModule.forRoot()
  ],
  providers: [ UserService, StatusService, MilestonesService, ActionItemsService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
