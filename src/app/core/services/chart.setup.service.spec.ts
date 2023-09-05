import { TestBed } from '@angular/core/testing';

import { ChartSetupService } from './chart.setup.service';

describe('ChartSetupService', () => {
  let service: ChartSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
