import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { State } from '../state';
import { Flow } from '../flow';
import { Stats } from '../stats';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { SET_CURRENT_FLOW } from '../_reducers/currentflow';
import { SET_CURRENT_STATS } from '../_reducers/currentflowstats';
import { JenkinsRemoteService } from '../jenkins-remote.service';

@Component({
  selector: 'app-flow-builds',
  templateUrl: './flow-builds.component.html',
  styleUrls: ['./flow-builds.component.css']
})
export class FlowBuildsComponent implements OnInit {

  currentFlow: Observable<Flow>;
  currentFlowStats: Observable<Stats>;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router,
    private J: JenkinsRemoteService
  ) { 
    this.currentFlow = this.store.select((state) => state.currentFlow);
    this.currentFlowStats = this.store.select((state) => state.currentFlowStats);
  }

  ngOnInit() {
    this.route.paramMap
    .switchMap((params: ParamMap) => this.J.getFlow(params.get('flowName')))
    .subscribe(response => {
      if (response.error == 'NOT_FOUND') {
        this.router.navigateByUrl('/404');
      }
      else {
        this.store.dispatch({ type: SET_CURRENT_FLOW, payload: response });
        this.J.getFlowStats(response.name).subscribe((stats) => this.store.dispatch({ type: SET_CURRENT_STATS, payload: stats }));
      };
    });


  }

}
