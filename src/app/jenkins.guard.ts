import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { JenkinsRemoteService } from './jenkins-remote.service';
import { State } from './state';
import { Store } from '@ngrx/store';
import { SET_CURRENT_USER } from './_reducers/user';
import { SET_CURRENT_URL } from './_reducers/url';
import { Router } from '@angular/router';

@Injectable()
export class JenkinsGuard implements CanActivate {

  url: Observable<string>;
  user: Observable<string>;

  constructor(
    private J: JenkinsRemoteService,
    private store: Store<State>,
    private router: Router
  ) {
    this.url = this.store.select(state => state.url);
    this.user = this.store.select(state => state.user);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    return new Promise<boolean>((resolve, reject) => {
      this.url.subscribe((url) => {
        if (url == null) {
          this.J.getJenkinsInfo().subscribe(response => {
            this.store.dispatch({ type: SET_CURRENT_URL, payload: response.json().url})
            this.user.subscribe((user) => {
              if (user == null) {
                this.J.getJenkinsInfo().subscribe(response => {
                  this.store.dispatch({ type: SET_CURRENT_USER, payload: response.json().username})
                  // Check if Jenkins is up and running ?!
                  this.J.isJenkinsRunning().subscribe(status => {
                    if (status == 'OK') {
                      resolve(true);
                    } else {
                      // Revoke then redirect
                      reject(false);
                      this.router.navigateByUrl('/server-connection');
                    }
                  })
                });
              }
            });
          }, (error) => {
            // Revoke then redirect
            reject(error);
            this.router.navigateByUrl('/server-connection');
          });
        } else {
          this.J.isJenkinsRunning().subscribe(status => {
            if (status == 'OK') {
              resolve(true);
            } else {
              // Revoke then redirect
              reject(status);
              this.router.navigateByUrl('/server-connection');
            }
          })
        }
      }); 
    });
  }
}
