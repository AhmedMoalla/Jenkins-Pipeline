import { Component, OnInit } from '@angular/core';
import { JenkinsRemoteService } from '../jenkins-remote.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { State } from '../state';
import { GET_ALL_FLOWS } from '../_reducers/allflows';
import { SET_CURRENT_FLOW } from '../_reducers/currentflow';
import { Flow } from '../flow';

@Component({
  selector: 'app-open-pipeline',
  templateUrl: './open-pipeline.component.html',
  styleUrls: ['./open-pipeline.component.css']
})
export class OpenPipelineComponent implements OnInit {

  allflows: Observable<Flow[]>;
  searchFilter: any = { name: '' };

  constructor(
    private J: JenkinsRemoteService,
    private store: Store<State>
  ) {
    this.allflows = store.select('allflows');
  }

  ngOnInit() {
    this.J.getFlows().subscribe((response) => this.store.dispatch({ type: GET_ALL_FLOWS, payload: response.json() }));
  }

}
