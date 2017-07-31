import { TestBed, async, inject } from '@angular/core/testing';

import { JenkinsGuard } from './jenkins.guard';

describe('JenkinsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JenkinsGuard]
    });
  });

  it('should ...', inject([JenkinsGuard], (guard: JenkinsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
