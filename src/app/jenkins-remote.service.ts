import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Flow } from './flow';

@Injectable()
export class JenkinsRemoteService {

  rooturl: string = "http://localhost:3000/jenkinsapi";
  constructor(private http: Http) { }

  getJobs(): Observable<any[]> {
    return this.http.get(this.rooturl + "/jobs").map((response) => response.json());
  }

  runFlow(flow: any) {
    return this.http.post(this.rooturl + '/runFlow', flow);
  }

  saveFlow(name: string, flow: any) {
    return this.http.post(this.rooturl + '/saveFlow?name=' + name, flow);
  }

  getFlows() {
    return this.http.get(this.rooturl + '/flows');
  }

  getFlow(name: string) : Observable<Flow> {
    return this.http.get(this.rooturl + '/flows/' + name).map((response) => response.json() as Flow);
  }

  flowExists(name: string) {
    return this.http.get(this.rooturl + '/flowExists?name=' + name);
  }

  getJobParams(name: string) {
    return this.http.get(this.rooturl + '/jobParams?name=' + name);
  }
}
