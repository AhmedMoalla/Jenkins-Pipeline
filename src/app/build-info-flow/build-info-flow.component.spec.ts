import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildInfoFlowComponent } from './build-info-flow.component';

describe('BuildInfoFlowComponent', () => {
  let component: BuildInfoFlowComponent;
  let fixture: ComponentFixture<BuildInfoFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildInfoFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildInfoFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
