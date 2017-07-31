import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { State } from '../state';
import { Flow } from '../flow';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { JenkinsRemoteService } from '../jenkins-remote.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentFlow: Observable<Flow>;
  user: Observable<string>;
  url: Observable<string>;
  showBuilds: boolean = false;
  showBackToPipeline: boolean = false;
  
  constructor(
    private store: Store<State>,
    private location: Location,
    private router: Router,
    private J: JenkinsRemoteService
  ) {
    this.currentFlow = this.store.select('currentFlow');
    this.user = this.store.select(state => state.user);
    this.url = this.store.select(state => state.url);
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.resetFlags();
      if(event instanceof NavigationEnd) {
        var routeName = this.getData(this.router.routerState, this.router.routerState.root)[1].name;
        switch(routeName) {
          case 'flow':
            this.showBuilds = true;
          break;
          case 'build':
          case 'builds':
            this.showBackToPipeline = true;
          break;
        }
      }
    })
  }

  openJenkinsInNewTab() {
    this.url.subscribe(url => window.open(url));
  }

  resetFlags() {
    this.showBuilds = false;
    this.showBackToPipeline = false;
  }

  getData(state, parent) {
    var data = [];
    if(parent && parent.snapshot.data) {
      data.push(parent.snapshot.data);
    }

    if(state && parent) {
      data.push(... this.getData(state, state.firstChild(parent)));
    }
    return data;
  }

}
