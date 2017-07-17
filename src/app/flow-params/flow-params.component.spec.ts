import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowParamsComponent } from './flow-params.component';

describe('FlowParamsComponent', () => {
  let component: FlowParamsComponent;
  let fixture: ComponentFixture<FlowParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
