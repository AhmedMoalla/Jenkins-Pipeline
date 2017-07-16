import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenPipelineComponent } from './open-pipeline.component';

describe('OpenPipelineComponent', () => {
  let component: OpenPipelineComponent;
  let fixture: ComponentFixture<OpenPipelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenPipelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
