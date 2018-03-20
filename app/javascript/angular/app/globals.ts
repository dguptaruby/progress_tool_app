import { Injectable, isDevMode } from "@angular/core";

@Injectable()
export class Globals {
  
  getbashPath() {
    let bash_path;
    if(isDevMode()) {
      bash_path = "http://localhost:3000";
    } else {
      bash_path = "http://35.173.230.144";
    }
    return bash_path;
  }

  getChannelPath() {
    let channel_path;
    return channel_path = "http://localhost:3000";
  }
}