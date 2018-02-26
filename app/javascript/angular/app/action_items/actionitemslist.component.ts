import { Component, OnInit } from '@angular/core';
import templateString from '../templates/actionitemslist.component.html'
import { ActionItemsService }   from '../services/actionitems.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'action-items-list',
  template: templateString
})
export class ActionItemsListComponent implements OnInit {

  action_items: any = [];
  show_error: string; 

  constructor(private actionitemsService: ActionItemsService) {
    
  }

  ngOnInit() {
    this.getActionItems();
  }

  getActionItems() {
    this.actionitemsService.getAllActionItems()
    .subscribe(
      response => {
        this.action_items = response.data;
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    );
  }

  delete(action_item:any, index:number) {
    if(confirm("Are you sure want to delete this action item "+action_item.name+" ?")) {
      this.actionitemsService.delete(action_item.id).subscribe(response =>{
        this.action_items.splice(index, 1);
      });
    }
  }

}
