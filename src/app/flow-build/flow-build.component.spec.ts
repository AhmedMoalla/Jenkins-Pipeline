import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowBuildComponent } from './flow-build.component';

describe('FlowBuildComponent', () => {
  let component: FlowBuildComponent;
  let fixture: ComponentFixture<FlowBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
