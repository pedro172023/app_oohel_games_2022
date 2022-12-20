import { TestBed } from '@angular/core/testing';

import { CalendarioEscolarService } from './services/calendario-escolar.service';

describe('CalendarioEscolarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendarioEscolarService = TestBed.get(CalendarioEscolarService);
    expect(service).toBeTruthy();
  });
});
