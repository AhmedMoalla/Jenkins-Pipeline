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
  socket: any;

  constructor(
    private store: Store<State>,
    private J: JenkinsRemoteService,
    private toast: MzToastService
  ) { 
    this.currentFlow = this.store.select('currentFlow');
    this.socket = this.store.select('socket');
  }

  ngOnInit() {
    this.currentFlow.subscribe((flow) => {
      this.socket.subscribe((socket) => socket.on('flow-update[' + flow.name + ']', (flowStatus) => {
        switch(flowStatus.type) {
          case 'FLOW_START':
            flow.isRunning = true;
          break;
          case 'FLOW_END':
            flow.isRunning = false;
          break;
        }
      }))
    })
  }

  runCurrentFlow() {
    this.currentFlow.subscribe((flow) => {
      if (flow.flow == undefined || flow.flow == null || flow.flow.length == 0) {
        this.toast.show(`Can't run an empty flow !`, 1500);
        return;
      }
      for (let i = 0; i < flow.flow.length; i++) {
        if (flow.flow[i] instanceof Array) {
          for (let j = 0; j < flow.flow[i].length; j++) {
            flow.flow[i][j].status = null
          }
        } else {
          flow.flow[i].status = null;
        }
      }
      this.J.runFlow(flow).subscribe((res) => console.log(res.json()));
    })
  }

  saveCurrentFlow() {
    this.currentFlow.subscribe((flow) => {
      this.J.saveFlow(flow.name, flow)
            .subscribe((res) => this.toast.show(`Flow "${flow.name}" saved.`, 1500));
    })
  }

  stopCurrentFlow() {
    this.currentFlow.subscribe((flow) => {
      flow.isRunning = false;
      // Clear status attribute
      for (let i = 0; i < flow.flow.length; i++) {
        if (flow.flow[i] instanceof Array) {
          for (let j = 0; j < flow.flow[i].length; j++) {
            flow.flow[i][j].status = null;
          }
        } else {
          flow.flow[i].status = null;
        }
      }
      this.saveCurrentFlow();
    })
  }

}
