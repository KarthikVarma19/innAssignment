import { TestBed } from '@angular/core/testing';

import { HelperStepperService } from './helper-stepper.service';

describe('HelperStepperService', () => {
  let service: HelperStepperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelperStepperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
