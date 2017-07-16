import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'ng2-materialize';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { TJsonViewerModule } from 't-json-viewer';
import { ClipboardModule } from 'ngx-clipboard';

import reducers from './_reducers/all';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { OpenPipelineComponent } from './open-pipeline/open-pipeline.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { JenkinsRemoteService } from './jenkins-remote.service';
import { FlowComponent } from './flow/flow.component';
import { FlowDashboardComponent } from './flow-dashboard/flow-dashboard.component';
import { FlowControlBarComponent } from './flow-control-bar/flow-control-bar.component';
import { AddJobModalComponent } from './add-job-modal/add-job-modal.component';

const routes: Routes = [
  /*
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: 'heroes',
    component: HeroListComponent,
    data: { title: 'Heroes List' }
  },*/
  { path: 'flow/:flowName', component: FlowDashboardComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
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
    AddJobModalComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    Ng2FilterPipeModule,
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
    ClipboardModule
  ],
  entryComponents: [AddJobModalComponent],
  providers: [JenkinsRemoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
