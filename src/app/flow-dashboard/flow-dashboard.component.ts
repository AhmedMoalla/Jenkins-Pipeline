import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Store } from '@ngrx/store';
import { SET_CURRENT_FLOW } from '../_reducers/currentflow';
import { State } from '../state';
import { JenkinsRemoteService } from '../jenkins-remote.service';
import { Flow } from '../flow';


@Component({
  selector: 'app-flow-dashboard',
  templateUrl: './flow-dashboard.component.html',
  styleUrls: ['./flow-dashboard.component.css']
})
export class FlowDashboardComponent implements OnInit {

  currentFlow: Observable<Flow>;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private J: JenkinsRemoteService
  ) {
    this.currentFlow = this.store.select('currentFlow');
  }

  ngOnInit() {
    this.route.paramMap
    .switchMap((params: ParamMap) => this.J.getFlow(params.get('flowName')))
    .subscribe(flow => this.openFlow(flow));
  }


  openFlow(flow: Flow) {
    this.store.dispatch({ type: SET_CURRENT_FLOW, payload: flow });
  }

}