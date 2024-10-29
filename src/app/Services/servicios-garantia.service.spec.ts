import { TestBed } from '@angular/core/testing';

import { ServiciosGarantiaService } from './servicios-garantia.service';

describe('ServiciosGarantiaService', () => {
  let service: ServiciosGarantiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosGarantiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
