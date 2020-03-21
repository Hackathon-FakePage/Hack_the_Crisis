import { TestBed } from '@angular/core/testing';

import { WordCounterCalculatorService } from './word-counter-calculator.service';

describe('WordCounterCalculatorService', () => {
  let service: WordCounterCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordCounterCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
