import { Component } from '@angular/core';
import templateString from './templates/app.component.html'

@Component({
  selector: 'app-root',
  template: templateString
})
export class AppComponent {
  name = 'User!';
}
