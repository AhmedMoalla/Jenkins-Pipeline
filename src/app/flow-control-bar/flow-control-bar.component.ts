import { Component, OnInit } from '@angular/core';
import { MzToastService } from 'ng2-materialize';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { JenkinsRemoteService } from '../jenkins-remote.service';
import { Flow } from '../flow';
import { State } from '../state';

@Component({
  selector: 'app-flow-control-bar',
  templateUrl: './flow-control-bar.component.html',
  styleUrls: ['./flow-control-bar.component.css']
})
export class FlowControlBarComponent implements OnInit {
  currentFlow: Observable<Flow>;

  constructor(
    private store: Store<State>,
    private J: JenkinsRemoteService,
    private toast: MzToastService
  ) { 
    this.currentFlow = this.store.select('currentFlow');
  }

  ngOnInit() {
  }

  saveCurrentFlow() {
    this.currentFlow.subscribe((flow) => {
      this.J.saveFlow(flow.name, flow.flow)
            .subscribe((res) => this.toast.show(`Flow "${flow.name}" saved.`, 1500));
    })
  }

}
