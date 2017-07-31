import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Flow } from '../flow';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { State } from '../state';

@Component({
  selector: 'app-build-info-flow',
  templateUrl: './build-info-flow.component.html',
  styleUrls: ['./build-info-flow.component.css']
})
export class BuildInfoFlowComponent implements OnInit {

  @Input() flow: Flow;
  currentBuild: Observable<any>;
  @Output() jobDetails: EventEmitter<any> = new EventEmitter();

  constructor(
    private store: Store<State>,
  ) { 
    this.currentBuild = this.store.select((state) => state.currentFlowBuild);
  }

  ngOnInit() {
  }

  showJobBuildDetails(jobName, buildNumber) {
    this.jobDetails.emit({ jobName, buildNumber });
  }

  /* Utils */
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
