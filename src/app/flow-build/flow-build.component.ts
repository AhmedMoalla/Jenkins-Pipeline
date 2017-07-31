import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { State } from '../state';
import { Flow } from '../flow';
import { Stats } from '../stats';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { SET_CURRENT_FLOW } from '../_reducers/currentflow';
import { SET_CURRENT_PIPELINE_BUILD } from '../_reducers/currentpipelinebuild';
import { JenkinsRemoteService } from '../jenkins-remote.service';

@Component({
  selector: 'app-flow-build',
  templateUrl: './flow-build.component.html',
  styleUrls: ['./flow-build.component.css']
})
export class FlowBuildComponent implements OnInit {

  currentFlow: Observable<Flow>;
  currentBuild: Observable<any>;
  chosenJobBuild: any;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router,
    private J: JenkinsRemoteService
  ) { 
   this.currentFlow = this.store.select((state) => state.currentFlow);
   this.currentBuild = this.store.select((state) => state.currentFlowBuild);
  }

  showJobBuildDetails(jobBuild) {
    this.J.getJobBuild(jobBuild.jobName, jobBuild.buildNumber).subscribe(build => {
      this.chosenJobBuild = build;
      this.chosenJobBuild.name = jobBuild.jobName;
    });
  }

  ngOnInit() {
    this.route.paramMap
    .switchMap((params: ParamMap) => this.J.getFlow(params.get('flowName')))
    .subscribe(flow => {
      if (flow.error == 'NOT_FOUND') {
        this.router.navigateByUrl('/404');
      }
      else {
        this.store.dispatch({ type: SET_CURRENT_FLOW, payload: flow });
        this.route.paramMap
        .switchMap((params: ParamMap) => this.J.getFlowBuild(flow.name, parseInt(params.get('buildNumber'))))
        .subscribe((build) => {
          if (build.error == 'NOT_FOUND') {
            this.router.navigateByUrl('/404');
          } else {
            this.store.dispatch({ type: SET_CURRENT_PIPELINE_BUILD, payload: build });
          }
        });
      };
    });
  }

  timestampToDateString(timestamp) {
    const date = new Date(timestamp);
    const day = this.formatNumber(date.getDate());
    const month = this.formatNumber(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = this.formatNumber(date.getHours())
    const minutes = this.formatNumber(date.getMinutes());
    const seconds = this.formatNumber(date.getSeconds());
    return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
  }

  isOneDigit(nb: number) {
    return nb.toString().length == 1;
  }

  formatNumber(nb: number) {
    return this.isOneDigit(nb) ? '0' + (nb) : (nb);
  }

}
