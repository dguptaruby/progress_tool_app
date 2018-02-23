import { Component } from '@angular/core';
import templateString from './template.html'

@Component({
  selector: 'app-dashboard',
  template: templateString
})
export class AppComponent {
  name = 'User!';
}
