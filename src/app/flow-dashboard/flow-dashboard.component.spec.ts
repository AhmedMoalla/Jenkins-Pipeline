import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowDashboardComponent } from './flow-dashboard.component';

describe('FlowDashboardComponent', () => {
  let component: FlowDashboardComponent;
  let fixture: ComponentFixture<FlowDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
