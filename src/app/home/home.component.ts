import { Component, OnInit } from '@angular/core';
import { JenkinsRemoteService } from '../jenkins-remote.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	sideNavShown: boolean = true;
	newFlowTitle: string = '';

	constructor(
		private J: JenkinsRemoteService,
		private router: Router
	){
	}

	createFlow() {
		if (this.newFlowTitle != '' && this.newFlowTitle != null && this.newFlowTitle != undefined) {
			this.J.saveFlow(this.newFlowTitle).subscribe(() => this.router.navigateByUrl('/flow/' + this.newFlowTitle));
		}
	}

  ngOnInit() {
  }

}
