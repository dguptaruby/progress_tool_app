import { Component } from '@angular/core';
import templateString from './templates/app.component.html'

let module: {
   id: string;
}
@Component({
  moduleId: module.id,
  selector: 'app-root',
  template: templateString
})
export class AppComponent {
  name = 'User!';
}
