import { TestBed } from '@angular/core/testing';

import { ConnectBffService } from './connect-bff.service';

describe('ConnectBffService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConnectBffService = TestBed.get(ConnectBffService);
    expect(service).toBeTruthy();
  });
});
