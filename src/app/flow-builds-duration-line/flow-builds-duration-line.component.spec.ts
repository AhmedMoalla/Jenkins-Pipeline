import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowBuildsDurationLineComponent } from './flow-builds-duration-line.component';

describe('FlowBuildsDurationLineComponent', () => {
  let component: FlowBuildsDurationLineComponent;
  let fixture: ComponentFixture<FlowBuildsDurationLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowBuildsDurationLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowBuildsDurationLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
