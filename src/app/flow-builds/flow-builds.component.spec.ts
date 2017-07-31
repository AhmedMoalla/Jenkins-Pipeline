import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowBuildsComponent } from './flow-builds.component';

describe('FlowBuildsComponent', () => {
  let component: FlowBuildsComponent;
  let fixture: ComponentFixture<FlowBuildsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowBuildsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowBuildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
