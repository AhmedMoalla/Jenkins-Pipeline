import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowBuildsPieComponent } from './flow-builds-pie.component';

describe('FlowBuildsPieComponent', () => {
  let component: FlowBuildsPieComponent;
  let fixture: ComponentFixture<FlowBuildsPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowBuildsPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowBuildsPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
