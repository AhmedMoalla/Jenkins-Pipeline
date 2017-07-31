import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { JenkinsRemoteService } from '../jenkins-remote.service';

@Component({
  selector: 'app-job-build-details',
  templateUrl: './job-build-details.component.html',
  styleUrls: ['./job-build-details.component.css']
})
export class JobBuildDetailsComponent implements OnInit, OnChanges {

  @Input() build: any;
  logs: string;

  constructor(
    private J: JenkinsRemoteService
  ) { }

  ngOnChanges(changes) {
    let currentBuild = changes['build'].currentValue;
    if (currentBuild != undefined){
      this.J.getJobBuildLogs(currentBuild.name, parseInt(currentBuild.id)).subscribe(logs => this.logs = logs);
      console.log(currentBuild.name, currentBuild.id);
    }
  }

  openInNewTab() {
    window.open(this.build.url);
  }

  ngOnInit() {
    
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

}
