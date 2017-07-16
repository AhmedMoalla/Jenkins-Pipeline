import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MzBaseModal, MzModalComponent } from 'ng2-materialize';
import { JenkinsRemoteService } from '../jenkins-remote.service';
import { Store } from '@ngrx/store';
import { State } from '../state';
import { Flow } from '../flow';

@Component({
  selector: 'app-add-job-modal',
  templateUrl: './add-job-modal.component.html',
  styleUrls: ['./add-job-modal.component.css']
})
export class AddJobModalComponent extends MzBaseModal implements OnInit {

  currentFlow: Observable<Flow>;
  @Input() jobPosition: number;
  allJobs: any[];
  searchFilter: any = { name: '' }
  selectedJob: any;

  constructor(
    private J: JenkinsRemoteService,
    private store: Store<State>
  ) {
    super();
    this.currentFlow = this.store.select('currentFlow');
  }

  ngOnInit() {
    this.J.getJobs().subscribe((jobs) => this.allJobs = jobs);
  }

  selectJobToAdd(job) {
    this.selectedJob = job;
    for (let j of this.allJobs) {
      if (j.name === job.name) {
        j.active = true;
      } else {
        j.active = false;
      }
    };
  }

  onClose() {
    this.selectedJob = null;
    for (let j of this.allJobs) {
      j.active = false;
    };
  }

  pushJob() {
    this.currentFlow.subscribe((flow) => {
      if (this.jobPosition === undefined) {
        flow.flow.push(this.selectedJob);
      } else if (flow.flow[this.jobPosition] instanceof Array) {
        flow.flow[this.jobPosition].push(this.selectedJob);
      } else {
        flow.flow[this.jobPosition] = [... [flow.flow[this.jobPosition], this.selectedJob]]
      }
      this.selectedJob = null;
    });
  }

}
