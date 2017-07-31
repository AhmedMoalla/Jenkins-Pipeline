import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Flow } from './flow';
import { Stats } from './stats';

@Injectable()
export class JenkinsRemoteService {

  rooturl: string = "http://localhost:3000/jenkinsapi"; // Port from config
  constructor(private http: Http) { }

  isJenkinsRunning() {
    return this.http.get(this.rooturl + '/running').map(response => response.json().status);
  }

  getJenkinsInfo() {
    return this.http.get(this.rooturl + '/info');
  }

  getJobs(): Observable<any[]> {
    return this.http.get(this.rooturl + "/jobs").map((response) => response.json());
  }

  runFlow(flow: Flow) {
    return this.http.post(this.rooturl + '/runFlow', flow);
  }

  saveFlow(name: string, flow: Flow = {}) {
    return this.http.post(this.rooturl + '/saveFlow?name=' + name, flow);
  }

  getFlows() {
    return this.http.get(this.rooturl + '/flows');
  }

  getFlow(name: string) : Observable<Flow | any> {
    return this.http.get(this.rooturl + '/flows/' + name).map((response) => response.json());
  }

  flowExists(name: string) {
    return this.http.get(this.rooturl + '/flowExists?name=' + name);
  }

  getJobParams(name: string) {
    return this.http.get(this.rooturl + '/jobParams?name=' + name);
  }

  getFlowParams(name: string) {
    return this.http.get(this.rooturl + '/flows/' + name + '/params');
  }

  getFlowStats(name: string) : Observable<Stats> {
    return this.http.get(this.rooturl + '/flows/' + name + '/stats').map((response) => response.json() as Stats);
  }

  getFlowBuild(name: string, buildNumber: number) : Observable<any> {
    return this.http.get(this.rooturl + '/flows/' + name + '/builds/' + buildNumber).map((response) => response.json());
  }

  getBuilds(name: string, nbPerPage: number, page: number) {
    return this.http.get(this.rooturl + '/flows/' + name + '/builds?n=' + nbPerPage + '&page=' + page + '&reverse=true').map((response) => response.json());
  }

  getJobBuild(jobName: string, buildNumber: number) {
    return this.http.get(this.rooturl + '/jobs/' + jobName + '/build/' + buildNumber).map(response => response.json());
  }

  getJobBuildLogs(jobName: string, buildNumber: number) {
    return this.http.get(this.rooturl + '/jobs/' + jobName + '/build/' + buildNumber + '/logs').map(response => response.text('iso-8859'));
  }
}
