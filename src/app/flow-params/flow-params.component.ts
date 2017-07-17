import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { State } from '../state';
import { Flow } from '../flow';

@Component({
  selector: 'app-flow-params',
  templateUrl: './flow-params.component.html',
  styleUrls: ['./flow-params.component.css']
})
export class FlowParamsComponent implements OnInit {

  getKeys = Object.keys;
  currentFlow: Observable<Flow>;

  constructor(
    private store: Store<State>
  ) { 
    this.currentFlow = this.store.select('currentFlow');
  }

  ngOnInit() {
  }

}
