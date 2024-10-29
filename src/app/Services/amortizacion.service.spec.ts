import { TestBed } from '@angular/core/testing';

import { AmortizacionService } from './amortizacion.service';

describe('AmortizacionService', () => {
  let service: AmortizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmortizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
