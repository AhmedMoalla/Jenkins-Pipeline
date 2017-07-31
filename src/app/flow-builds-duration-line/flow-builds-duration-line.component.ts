import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../state';
import { Observable } from 'rxjs/Observable';
import { Stats } from '../stats';

@Component({
  selector: 'app-flow-builds-duration-line',
  templateUrl: './flow-builds-duration-line.component.html',
  styleUrls: ['./flow-builds-duration-line.component.css']
})
export class FlowBuildsDurationLineComponent implements OnInit {

  currentFlowStats: Observable<Stats>;

  lineChartData:Array<any> = [
    {data: [], label: 'Build Durations'}
  ];
  lineChartLabels:Array<any> = [];
  lineColors: Array<any> = [
    { // indigo
      backgroundColor: 'rgba(63, 81, 181, 0.2)',
      borderColor: 'rgba(63, 81, 181, 1)',
      pointBackgroundColor: 'rgb(63, 81, 181)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(63, 81, 181, 0.8)',
      pointHoverBorderColor: 'rgb(63, 81, 181, 0.8)'
    }
  ]
  lineChartOptions:any = {
    maintainAspectRatio: false,
  };
  constructor(
    private store: Store<State>
  ) {
    this.currentFlowStats = this.store.select((state) => state.currentFlowStats);
  }

  ngOnInit() {
    this.currentFlowStats.subscribe((stats) => {
      if (stats) {
        stats.execDurations.forEach((duration, i) => {
          this.lineChartData[0].data.push(duration);
          this.lineChartLabels.push('#' + (i + 1));
        })
      }
    })
  }

}
