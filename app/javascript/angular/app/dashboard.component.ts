import { Component } from '@angular/core';
import templateString from './templates/dashboard.component.html'


@Component({
  selector: 'app-dashboard',
  template: templateString,
})
export class DashboardComponent {
  componentName = 'DashboardComponent';
  name = 'User!';
}
