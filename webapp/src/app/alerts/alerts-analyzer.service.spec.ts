import { TestBed } from '@angular/core/testing';

import { AlertsAnalyzerService } from './alerts-analyzer.service';

describe('AlertsAnalyzerService', () => {
  let service: AlertsAnalyzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertsAnalyzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
