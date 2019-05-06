import { TestBed } from '@angular/core/testing';

import { IMDBService } from './imdb.service';

describe('IMDBService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IMDBService = TestBed.get(IMDBService);
    expect(service).toBeTruthy();
  });
});
