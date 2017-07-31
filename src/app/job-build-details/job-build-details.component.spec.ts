import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBuildDetailsComponent } from './job-build-details.component';

describe('JobBuildDetailsComponent', () => {
  let component: JobBuildDetailsComponent;
  let fixture: ComponentFixture<JobBuildDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobBuildDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobBuildDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
