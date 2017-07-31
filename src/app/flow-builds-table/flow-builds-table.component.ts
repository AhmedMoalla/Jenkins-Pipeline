import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../state';
import { Observable } from 'rxjs/Observable';
import { Flow } from '../flow';
import { JenkinsRemoteService } from '../jenkins-remote.service';

@Component({
  selector: 'app-flow-builds-table',
  templateUrl: './flow-builds-table.component.html',
  styleUrls: ['./flow-builds-table.component.css']
})
export class FlowBuildsTableComponent implements OnInit {

  currentFlow: Observable<Flow>;
  activePage: number;
  maxPage: number;
  nbPerPage: number = 5;
  fiveBuilds: Array<any> = [];

  constructor(
    private store: Store<State>,
    private J: JenkinsRemoteService
  ) {
    this.currentFlow = this.store.select((state) => state.currentFlow);
  }

  ngOnInit() {
    this.currentFlow.subscribe((flow) => {
      if (flow) {
        this.J.getBuilds(flow.name, this.nbPerPage, 0).subscribe(builds => {
          this.fiveBuilds = builds.builds;
          this.maxPage = builds.nbPages;
          this.activePage = 0;
        });
      }
    })
  }

  goToPage(page) {
    this.currentFlow.subscribe((flow) => {
      if (flow) {
        this.J.getBuilds(flow.name, this.nbPerPage, page).subscribe(builds => {
          this.fiveBuilds = builds.builds;
          this.maxPage = builds.nbPages;
          this.activePage = page;
        });
      }
    })
  }

  nbPagesRange() {
    let nbPages = [];
    if (this.activePage == 0 || this.activePage == 1) {
      nbPages = this.createRange(0, Math.min(2, this.maxPage));
    } else if (this.activePage == this.maxPage) {
      nbPages = this.createRange(Math.max(0, this.maxPage - 2), this.maxPage);
    } else {
      nbPages = this.createRange(this.activePage - 1, Math.min(this.activePage + 1, this.maxPage));
    }
    return nbPages;
  }

  timestampToDateString(timestamp) {
    const date = new Date(timestamp);
    const day = this.formatNumber(date.getDate());
    const month = this.formatNumber(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = this.formatNumber(date.getHours())
    const minutes = this.formatNumber(date.getMinutes());
    const seconds = this.formatNumber(date.getSeconds());
    return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
  }

  isOneDigit(nb: number) {
    return nb.toString().length == 1;
  }

  formatNumber(nb: number) {
    return this.isOneDigit(nb) ? '0' + (nb) : (nb);
  }

  createRange(from, to) {
    let res = [];
    for (let i = from; i <= to; i++) {
      res.push(i);
    }
    return res;
  }

}
