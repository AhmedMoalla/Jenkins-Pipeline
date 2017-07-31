import { Component, OnInit } from '@angular/core';
import { JenkinsRemoteService } from '../jenkins-remote.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-connection',
  templateUrl: './server-connection.component.html',
  styleUrls: ['./server-connection.component.css']
})
export class ServerConnectionComponent implements OnInit {

  constructor(
    private J: JenkinsRemoteService,
    private router: Router
  ) { }

  ngOnInit() {
    let interval = setInterval(() => {
      this.J.isJenkinsRunning().subscribe(status => {
        if (status == 'OK') {
          clearInterval(interval);
          this.router.navigateByUrl('/');
        } 
      }, error => console.log());
    }, 1000)
  }

}
