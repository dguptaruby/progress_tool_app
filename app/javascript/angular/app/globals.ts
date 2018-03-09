import { Injectable, isDevMode } from "@angular/core";

@Injectable()
export class Globals {
  
  getbashPath() {
    if(isDevMode()) {
      let bash_path = "http://localhost:3000";
    } else {
      let bash_path = "http://35.173.230.144";
    }
    return bash_path;
  }
}