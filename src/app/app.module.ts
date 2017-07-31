import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'ng2-materialize';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { TJsonViewerModule } from 't-json-viewer';
import { ClipboardModule } from 'ngx-clipboard';
import { ChartsModule } from 'ng2-charts';
import { JenkinsGuard } from './jenkins.guard';

import reducers from './_reducers/all';
import { JenkinsRemoteService } from './jenkins-remote.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { OpenPipelineComponent } from './open-pipeline/open-pipeline.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FlowComponent } from './flow/flow.component';
import { FlowDashboardComponent } from './flow-dashboard/flow-dashboard.component';
import { FlowControlBarComponent } from './flow-control-bar/flow-control-bar.component';
import { AddJobModalComponent } from './add-job-modal/add-job-modal.component';
import { FlowParamsComponent } from './flow-params/flow-params.component';
import { FlowLogsComponent } from './flow-logs/flow-logs.component';
import { FlowBuildsComponent } from './flow-builds/flow-builds.component';
import { FlowBuildsTableComponent } from './flow-builds-table/flow-builds-table.component';
import { FlowBuildsPieComponent } from './flow-builds-pie/flow-builds-pie.component';
import { FlowBuildsDurationLineComponent } from './flow-builds-duration-line/flow-builds-duration-line.component';
import { FlowBuildComponent } from './flow-build/flow-build.component';
import { BuildInfoFlowComponent } from './build-info-flow/build-info-flow.component';
import { JobBuildDetailsComponent } from './job-build-details/job-build-details.component';
import { ServerConnectionComponent } from './server-connection/server-connection.component';

const routes: Routes = [
  { path: 'flow/:flowName', component: FlowDashboardComponent, data: { name: 'flow' }, canActivate: [JenkinsGuard] },
  { path: 'flow/:flowName/builds', component: FlowBuildsComponent, data: { name: 'builds' }, canActivate: [JenkinsGuard] },
  { path: 'flow/:flowName/builds/:buildNumber', component: FlowBuildComponent, data: { name: 'build' }, canActivate: [JenkinsGuard] },
  { path: '', component: HomeComponent, data: { name: 'home' }, canActivate: [JenkinsGuard] },
  { path: 'server-connection', component: ServerConnectionComponent, data: { name: 'server-connection' } },
  { path: '**', redirectTo: '404' },
  { path: '404', component: PageNotFoundComponent, data: { name: '404' } }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    OpenPipelineComponent,
    PageNotFoundComponent,
    FlowComponent,
    FlowDashboardComponent,
    FlowControlBarComponent,
    AddJobModalComponent,
    FlowParamsComponent,
    FlowLogsComponent,
    FlowBuildsComponent,
    FlowBuildsTableComponent,
    FlowBuildsPieComponent,
    FlowBuildsDurationLineComponent,
    FlowBuildComponent,
    BuildInfoFlowComponent,
    JobBuildDetailsComponent,
    ServerConnectionComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    Ng2FilterPipeModule,
    Ng2OrderModule,
    FormsModule,
    StoreModule.provideStore(reducers),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
    MaterializeModule.forRoot(),
    RouterModule.forRoot(
        routes    
    ),
    TJsonViewerModule,
    ClipboardModule,
    ChartsModule
  ],
  entryComponents: [AddJobModalComponent],
  providers: [JenkinsRemoteService, JenkinsGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
