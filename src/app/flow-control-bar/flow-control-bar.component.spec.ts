import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowControlBarComponent } from './flow-control-bar.component';

describe('FlowControlBarComponent', () => {
  let component: FlowControlBarComponent;
  let fixture: ComponentFixture<FlowControlBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowControlBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowControlBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
