import { Component } from '@angular/core';
import templateString from './templates/dashboard.component.html'

let module: {
   id: string;
}
@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  template: templateString,
})
export class DashboardComponent {
  componentName = 'DashboardComponent';
  name = 'User!';
}
