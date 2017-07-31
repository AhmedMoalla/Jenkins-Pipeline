import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowLogsComponent } from './flow-logs.component';

describe('FlowLogsComponent', () => {
  let component: FlowLogsComponent;
  let fixture: ComponentFixture<FlowLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
