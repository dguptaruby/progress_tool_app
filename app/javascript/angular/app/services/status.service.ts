import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class StatusService {
constructor(private http:Http) { }

  getStatus() {
    return this.http.get('/status').map((res: Response) => res.json());
  }

}