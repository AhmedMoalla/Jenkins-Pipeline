import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../state';
import { Observable } from 'rxjs/Observable';
import { Stats } from '../stats';

@Component({
  selector: 'app-flow-builds-pie',
  templateUrl: './flow-builds-pie.component.html',
  styleUrls: ['./flow-builds-pie.component.css']
})
export class FlowBuildsPieComponent implements OnInit {

  currentFlowStats: Observable<Stats>;

  constructor(
    private store: Store<State>
  ) {
    this.currentFlowStats = this.store.select((state) => state.currentFlowStats);
  }

  ngOnInit() {
  }
  
}
