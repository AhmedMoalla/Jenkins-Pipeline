import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { SET_CURRENT_FLOW } from '../_reducers/currentflow';
import { State } from '../state';
import { Flow } from '../flow';
import { JenkinsRemoteService } from '../jenkins-remote.service';
import { MzModalService } from 'ng2-materialize';
import { AddJobModalComponent } from '../add-job-modal/add-job-modal.component';;

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css']
})
export class FlowComponent implements OnInit {

  currentFlow: Observable<Flow>;
  socket: any;

  constructor(
    private store: Store<State>,
    private J: JenkinsRemoteService,
    private modalService: MzModalService
  ) {
    this.currentFlow = this.store.select('currentFlow');
    this.socket = this.store.select('socket');
  }

  ngOnInit() {
    this.currentFlow.subscribe((flow) => {
      this.socket.subscribe((socket) => socket.on('flow-update[' + flow.name + ']', (flowStatus) => {
        const data = flowStatus.data;
        switch(flowStatus.type) {
          case "JOB_START":
              flow.flow[data.index].status = 'PROGRESS'
          break;
          case "JOB_END":
              flow.flow[data.index].status = flowStatus.status;
          break;
          case "PARALLEL_JOB_START":
              flow.flow[data.index][data.j].status = 'PROGRESS'
          break;
          case "PARALLEL_JOB_END":
              flow.flow[data.index][data.j].status = flowStatus.status;
          break;
        }
      }))
    })
  }

  pushJob(position) {
    this.modalService.open(AddJobModalComponent, { jobPosition: position });
  }

  deleteJob(i, j) {
    this.currentFlow.subscribe((flow) => {
      if (j === undefined) { // !Array
        flow.flow.splice(i, 1);
      } else { // Array
        flow.flow[i].splice(j, 1);
        if (flow.flow[i].length === 0) { // If array is empty remove it
          flow.flow.splice(i, 1);
        }
        if (flow.flow[i].length === 1) { // If array has one elt just replace it with the elt
          flow.flow[i] = flow.flow[i][0];
        }
      }
      this.J.saveFlow(flow.name, flow)
            .subscribe((res) => {
              this.J.getFlowParams(flow.name).subscribe((params) => {
                flow.parameters = params.json();
                this.J.saveFlow(flow.name, flow).subscribe();
              })
            });
    });
  }

  /** Utils  */
  isArray(obj: any) {
    return obj instanceof Array;
  }

  maxArray(array) {
    let max = 2;
    for (let i = 0; i < array.length; i++) {
        if (array[i] instanceof Array && array[i].length > max) max = array[i].length;
    }
    return max;
  }

  createRange(num) {
    let res = [];
    for (let i = 0; i < num; i++) {
      res.push(i);
    }
    return res;
  }
}
