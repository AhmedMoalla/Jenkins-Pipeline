import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowBuildsTableComponent } from './flow-builds-table.component';

describe('FlowBuildsTableComponent', () => {
  let component: FlowBuildsTableComponent;
  let fixture: ComponentFixture<FlowBuildsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowBuildsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowBuildsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
